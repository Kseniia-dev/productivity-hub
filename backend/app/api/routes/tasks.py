from fastapi import APIRouter


from app.schemas.task import TaskRead, TaskCreate


router = APIRouter(prefix="/tasks", tags=["Tasks"])


task_storage = []

next_task_id = 1


@router.get("", response_model=list[TaskRead])
def get_tasks():
    return task_storage





@router.post("", response_model=TaskRead)
def create_tasks(task_data: TaskCreate):
    global next_task_id

    task_dict = task_data.model_dump()
    task_dict["id"] = next_task_id

    task_storage.append(task_dict)

    next_task_id += 1

    return task_dict
