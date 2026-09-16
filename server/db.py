import os
import psycopg
from dotenv import load_dotenv
from psycopg.rows import dict_row

load_dotenv()

conn = psycopg.connect(os.getenv("DATABASE_URL"), row_factory=dict_row)

print("Database connected successfully.")
