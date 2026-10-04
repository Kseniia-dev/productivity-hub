from fastapi import APIRouter, HTTPException


from app.schemas.task import TaskRead, TaskCreate, TaskUpdate
from app.storage import tasks as task_storage

from datetime import date as Date

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("", response_model=list[TaskRead])
def get_tasks(
    task_date: Date | None = None,
    user_id: int | None = None,
):
    tasks = task_storage.get_tasks(task_date=task_date, user_id=user_id)

    return tasks


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int):
    task = task_storage.get_task_by_id(task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.delete("/{task_id}", response_model=TaskRead)
def delete_task(task_id: int):
    task = task_storage.delete_task(task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.post("", response_model=TaskRead)
def create_tasks(task_data: TaskCreate):
    task = task_storage.create_task(task_data)
    
    return task


@router.patch("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_data: TaskUpdate):

    task = task_storage.update_task(task_id, task_data)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return task
