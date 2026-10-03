from fastapi import APIRouter, HTTPException


from app.schemas.task import TaskRead, TaskCreate, TaskUpdate


router = APIRouter(prefix="/tasks", tags=["Tasks"])


task_storage = []

next_task_id = 1


@router.get("", response_model=list[TaskRead])
def get_tasks():
    return task_storage


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int):
    for task in task_storage:
        if task["id"] == task_id:
            return task
    raise HTTPException(status_code=404, detail="Task not found")


@router.delete("/{task_id}", response_model=TaskRead)
def delete_task(task_id: int):
    for index, task in enumerate(task_storage):
        if task["id"] == task_id:
            deleted_task = task_storage.pop(index)
            return deleted_task
    raise HTTPException(status_code=404, detail="Task not found")


@router.post("", response_model=TaskRead)
def create_tasks(task_data: TaskCreate):
    global next_task_id

    task_dict = task_data.model_dump()
    task_dict["id"] = next_task_id

    task_storage.append(task_dict)

    next_task_id += 1

    return task_dict


@router.patch("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_data: TaskUpdate):

    task = next(
        (task for task in task_storage 
        if task["id"] == task_id),
        None
    )

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
            
    update_data = task_data.model_dump(exclude_unset=True)
    
    task.update(update_data)
    
    return task
