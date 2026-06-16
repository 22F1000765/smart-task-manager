from fastapi import FastAPI
from app.routers.task import router as task_router

app = FastAPI(
    title="Smart Task Manager API",
    version="1.0.0"
)

app.include_router(task_router)


@app.get("/")
def home():
    return {
        "message": "Smart Task Manager API Running"
    }