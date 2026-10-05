from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.api.routes.tasks import router as tasks_router

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="ProductivityHub API",
    description="Backend API for ProductivityHub",
    version="0.1.0",
)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type", "Authorization"]
)


app.include_router(health_router)
app.include_router(tasks_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Productivity Hub API!"}




