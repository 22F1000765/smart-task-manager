from fastapi import APIRouter, HTTPException, Depends
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.models.user import User
from app.dependencies import get_current_user

from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from sqlalchemy import desc

router = APIRouter(tags=["Tasks"])


@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    status: str | None = None,
    search: str | None = None,
    sort: str | None = None,
    page: int = 1,
    limit: int = 10,
    owner_id: int | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Task).filter(
        Task.owner_id == current_user.id
    )

    if owner_id:
        query = query.filter(
            Task.owner_id == owner_id
        )

    if status:
        query = query.filter(Task.status == status)

    if search:
        query = query.filter(
            Task.title.ilike(f"%{search}%")
        )

    if sort == "newest":
        query = query.order_by(
            desc(Task.created_at)
        )

    elif sort == "oldest":
        query = query.order_by(
            Task.created_at
        )
    offset = (page - 1)*limit

    return query.offset(offset).limit(limit).all()

@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


@router.post(
    "/",
    response_model=TaskResponse
)

def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    
):

    new_task = Task(
        title=task.title,
        description=task.description,
        owner_id=current_user.id
    )

    
    
    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return new_task

@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    updated_task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
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

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
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