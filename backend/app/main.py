from fastapi import FastAPI

app = FastAPI(
    title="ProductivityHub API",
    description="Backend API for ProductivityHub",
    version="0.1.0",
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to the Productivity Hub API!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}