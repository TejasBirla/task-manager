from flask import Blueprint, jsonify, request, abort
from db import conn
from validators import validate_task_desc, validate_json_body
from auth_middleware import token_required

task_routes = Blueprint("task_routes", __name__)


# Get all tasks from the database
@task_routes.route("/api/all-tasks", methods=["GET"])
@token_required
def all_tasks(current_user):

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT * FROM tasks 
                WHERE user_id = %s""",
                (current_user["user_id"],),
            )
            tasks = cursor.fetchall()

        return jsonify(tasks), 200

    except Exception as e:
        # If the database operation fails, reset the transaction
        # before sending the error to our centralized 500 handler.
        conn.rollback()
        print("Database problem:", e)
        abort(500)


# Add a new task
@task_routes.route("/api/add-task", methods=["POST"])
@token_required
def add_task(current_user):

    data = request.json

    # Validate the request body before touching the database.
    error = validate_json_body(data)

    if error:
        return jsonify({"error": error}), 400

    if "task_desc" not in data:
        return jsonify({"error": "task description is required."}), 400

    error = validate_task_desc(data["task_desc"])

    if error:
        return jsonify({"error": error}), 400

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """ SELECT * FROM tasks 
                where task_desc = %s AND user_id = %s 
                """,
                (data["task_desc"], current_user["user_id"]),
            )
            existing_task = cursor.fetchone()

            if existing_task:
                return jsonify({"error": "Task already exists."}), 400

        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO tasks (task_desc, completed, user_id)
                VALUES (%s, %s, %s)
                RETURNING *
                """,
                (data["task_desc"], False, current_user["user_id"]),
            )

            new_task = cursor.fetchone()

        # The INSERT is only permanently saved after commit().
        conn.commit()

        return jsonify({"message": "Task added.", "new_task": new_task}), 201

    except Exception as e:
        # Something went wrong during the database operation,
        # so undo the current transaction.
        conn.rollback()

        print("Database problem:", e)

        # Let Flask's centralized 500 handler create the response.
        abort(500)


# Get a single task by its ID
@task_routes.route("/api/task/<int:task_id>", methods=["GET"])
@token_required
def taskbyID(current_user, task_id):

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM tasks WHERE task_id = %s AND user_id = %s",
                (task_id, current_user["user_id"]),
            )

            task = cursor.fetchone()

    except Exception as e:
        conn.rollback()
        print("Database problem:", e)
        abort(500)

    # This is not a database error.
    # The database worked, but there is simply no task with this ID.
    if task is None:
        abort(404)

    return jsonify(task), 200


# Update an existing task
@task_routes.route("/api/task/<int:task_id>", methods=["PUT"])
@token_required
def updatetask(current_user, task_id):

    data = request.json

    error = validate_json_body(data)

    if error:
        return jsonify({"error": error}), 400

    if "completed" not in data or "task_desc" not in data:
        return jsonify({"error": "Both fields are required"}), 400

    error = validate_task_desc(data["task_desc"])

    if error:
        return jsonify({"error": error}), 400

    if not isinstance(data["completed"], bool):
        return jsonify({"error": "completed must be true or false"}), 400

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                UPDATE tasks
                SET task_desc = %s,
                    completed = %s
                WHERE task_id = %s AND user_id = %s
                RETURNING *
                """,
                (
                    data["task_desc"],
                    data["completed"],
                    task_id,
                    current_user["user_id"],
                ),
            )

            updated_task = cursor.fetchone()

    except Exception as e:
        conn.rollback()
        print("Database problem:", e)
        abort(500)

    # The UPDATE ran successfully, but no row matched the given ID.
    if updated_task is None:
        abort(404)

    conn.commit()

    return jsonify({"message": "Task Updated.", "updated_task": updated_task}), 200


# Delete a task
@task_routes.route("/api/delete/task/<int:task_id>", methods=["DELETE"])
@token_required
def deletetask(current_user, task_id):

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                DELETE FROM tasks
                WHERE task_id = %s AND user_id = %s
                RETURNING *
                """,
                (task_id, current_user["user_id"]),
            )

            deleted_task = cursor.fetchone()

    except Exception as e:
        conn.rollback()
        print("Database problem:", e)
        abort(500)

    # The database operation worked, but the task didn't exist.
    if deleted_task is None:
        abort(404)

    conn.commit()

    return jsonify({"message": "Task deleted."}), 200
