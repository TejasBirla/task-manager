import psycopg
from psycopg.rows import dict_row

conn = psycopg.connect(
    dbname="task_manager",
    user="tejasbirla3gmail.com",
    host="/tmp",
    port=5432,
    row_factory=dict_row,
)

print("Database connected successfully.")
