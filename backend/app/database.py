from pathlib import Path
import psycopg
from dotenv import dotenv_values

ENV_FILE = Path(__file__).resolve().parents[2] / ".env"

def get_connection():
    password = dotenv_values(ENV_FILE, interpolate=False).get("POSTGRES_PASSWORD")
    if not password:
        raise RuntimeError("POSTGRES_PASSWORD not found in .env file")

    return psycopg.connect(
        host="127.0.0.1",
        port=5432,
        dbname="productivity_hub",
        user="productivity_user",
        password=password,
        connect_timeout=5,
    )
