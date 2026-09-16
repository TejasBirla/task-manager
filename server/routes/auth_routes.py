from flask import Blueprint, jsonify, request, abort
from db import conn
from werkzeug.security import generate_password_hash, check_password_hash
from validators import validate_json_body
from email_validator import validate_email
from token_utils import create_token
from auth_middleware import token_required
from psycopg.errors import UniqueViolation

auth_routes = Blueprint("auth_routes", __name__)



@auth_routes.route("/api/register", methods=["POST"])
def user_register():
    data = request.json

    # Validate request body before using its fields.
    error = validate_json_body(data)
    if error:
        return jsonify({"error": error}), 400

    # Check required fields.
    if not data.get("username") or not data.get("email") or not data.get("password"):
        return jsonify({"error": "All fields are required."}), 400

    # Validate and normalize email before storing it.
    try:
        email = validate_email(data["email"])
        email = email.normalized
    except Exception:
        return jsonify({"error": "Invalid email address."}), 400

    # Validate username.
    if not isinstance(data["username"], str) or data["username"].strip() == "":
        return jsonify({"error": "Username cannot be empty."}), 400

    # Validate password length.
    if len(data["password"]) < 6:
        return jsonify({"error": "Password must be at least 6 characters long."}), 400

    # Never store the original password in the database.
    password_hash = generate_password_hash(data["password"])

    try:
        # Check for duplicate username or email.
        with conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT 1
                FROM users
                WHERE username = %s OR email = %s
                """,
                (data["username"], email),
            )

            existing_user = cursor.fetchone()

            if existing_user:
                return jsonify(
                    {"error": "Username or email already exists."}
                ), 409

        # Create the new user.
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash)
                VALUES (%s, %s, %s)
                RETURNING user_id, username, email
                """,
                (data["username"], email, password_hash),
            )

            new_user = cursor.fetchone()

            # Create JWT so the user is logged in immediately.
            token = create_token(new_user)

        # Save transaction.
        conn.commit()

        return (
            jsonify(
                {
                    "message": "Registration successful",
                    "user": {
                        "user_id": new_user["user_id"],
                        "username": new_user["username"],
                        "email": new_user["email"],
                    },
                    "token": token,
                }
            ),
            201,
        )

    except UniqueViolation:
        # Database-level protection against duplicate username/email.
        conn.rollback()

        return jsonify(
            {"error": "Username or email already exists."}
        ), 409

    except Exception as e:
        # Handle unexpected database/server errors.
        conn.rollback()

        print("Error in user register:", e)
        abort(500)

@auth_routes.route("/api/login", methods=["POST"])
def user_login():
    data = request.json

    error = validate_json_body(data)
    if error:
        return jsonify({"error": error}), 400

    if "username" not in data or "password" not in data:
        return jsonify({"error": "All fields are required."}), 400

    if not isinstance(data["username"], str) or data["username"].strip() == "":
        return jsonify({"error": "Username cannot be empty."}), 400

    if len(data["password"]) < 6:
        return jsonify({"error": "Password must be at least 6 characters long."}), 400

    try:
        with conn.cursor() as cursor:
            # Fetch the stored password hash to verify the login.
            cursor.execute(
                """
                SELECT user_id, username, email, password_hash
                FROM users
                WHERE username = %s
                """,
                (data["username"],),
            )

            existing_user = cursor.fetchone()

            if existing_user is None:
                return jsonify({"error": "User not found"}), 404

            # Compare the entered password with the stored hash.
            if not check_password_hash(
                existing_user["password_hash"],
                data["password"],
            ):
                return jsonify({"error": "Incorrect Password"}), 401

        # Credentials are valid, so issue a JWT for protected routes.
        token = create_token(existing_user)

        return (
            jsonify(
                {
                    "message": "Login Successful",
                    "token": token,
                    "user": {
                        "user_id": existing_user["user_id"],
                        "username": existing_user["username"],
                        "email": existing_user["email"],
                    },
                }
            ),
            200,
        )

    except Exception as e:
        conn.rollback()
        print("Error in user login:", e)
        abort(500)


@auth_routes.route("/api/delete/user", methods=["DELETE"])
@token_required
def delete_user(current_user):
    try:
        with conn.cursor() as cursor:
            # Use the user_id from the verified JWT, not from the request.
            cursor.execute(
                """
                DELETE FROM users
                WHERE user_id = %s
                RETURNING user_id
                """,
                (current_user["user_id"],),
            )

            deleted_user = cursor.fetchone()

            if deleted_user is None:
                abort(404)

            # ON DELETE CASCADE also removes the user's tasks.
            conn.commit()

        return jsonify({"message": "Account deleted successfully."}), 200

    except Exception as e:
        conn.rollback()
        print("Database problem:", e)
        abort(500)
