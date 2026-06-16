from fastapi import APIRouter, HTTPException
from app.schemas.task import TaskCreate, TaskUpdate

router = APIRouter(tags=["Tasks"])

tasks = []
task_id_counter = 1


@router.get("/tasks")
def get_tasks():
    return tasks


@router.get("/tasks/{task_id}")
def get_task(task_id: int):

    for task in tasks:
        if task["id"] == task_id:
            return task

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


@router.post("/tasks")
def create_task(task: TaskCreate):

    global task_id_counter

    new_task = {
        "id": task_id_counter,
        "title": task.title,
        "description": task.description
    }

    tasks.append(new_task)

    task_id_counter += 1

    return {
        "message": "Task created successfully",
        "task": new_task
    }


@router.put("/tasks/{task_id}")
def update_task(task_id: int, updated_task: TaskUpdate):

    for task in tasks:

        if task["id"] == task_id:

            task["title"] = updated_task.title
            task["description"] = updated_task.description

            return {
                "message": "Task updated successfully",
                "task": task
            }

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    for task in tasks:

        if task["id"] == task_id:

            tasks.remove(task)

            return {
                "message": "Task deleted successfully"
            }

    raise HTTPException(
        status_code=404,
        detail="Task not found"
    )