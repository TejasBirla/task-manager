from functools import wraps
from flask import request, jsonify
from token_utils import decode_token


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        # Authorization header contains the JWT sent by the frontend.
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"error": "Authorization token is required."}), 401

        # Authorization: Bearer <token>
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Invalid authorization header."}), 401

        # Remove "Bearer " and keep only the actual JWT.
        token = auth_header.split(" ", 1)[1]

        # decode_token() verifies the JWT signature and expiration.
        payload = decode_token(token)

        if payload is None:
            return jsonify({"error": "Invalid or expired token."}), 401

        # Token is valid, so allow the original route to execute.
        return f(payload, *args, **kwargs)

    return decorated
