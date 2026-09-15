import jwt
import os
from dotenv import load_dotenv

load_dotenv()


def create_token(user):
    token = jwt.encode(
        {"user_id": user["user_id"], "username": user["username"]},
        os.getenv("JWT_SECRET_KEY"),
        algorithm="HS256",
    )
    return token


def decode_token(token):
    try:
        payload = jwt.decode(token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
        return payload
    except jwt.InvalidTokenError:
        return None
