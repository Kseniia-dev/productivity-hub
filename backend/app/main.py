from fastapi import FastAPI
from app.api.routes.health import router as health_router


app = FastAPI(
    title="ProductivityHub API",
    description="Backend API for ProductivityHub",
    version="0.1.0",
    )

app.include_router(health_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Productivity Hub API!"}

