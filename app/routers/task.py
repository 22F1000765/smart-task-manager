from fastapi import APIRouter, HTTPException, Depends
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task

router = APIRouter(tags=["Tasks"])

@router.get(
    "/tasks",
    response_model=list[TaskResponse]
)
def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).all()

    return tasks

@router.get(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


@router.post(
    "/tasks",
    response_model=TaskResponse
)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):

    new_task = Task(
        title=task.title,
        description=task.description
    )

    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return new_task

@router.put(
    "/tasks/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    updated_task: TaskUpdate,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = updated_task.title
    task.description = updated_task.description
    task.status = updated_task.status

    db.commit()

    db.refresh(task)

    return task

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)

    db.commit()

    return {
        "message": "Task deleted successfully"
    }