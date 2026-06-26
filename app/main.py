from fastapi import FastAPI

from app.database import Base,engine
from app.models.task import Task

from app.routers.task import router as task_router
from app.routers.user import router as user_router

from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Task Manager API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(task_router,
                   prefix="/tasks",
                   tags=["Tasks"]
                   )

app.include_router(user_router,
                   prefix="/users",
                   tags=["Users"]
                   )



@app.get("/")
def home():
    return {
        "message": "Smart Task Manager API Running"
    }