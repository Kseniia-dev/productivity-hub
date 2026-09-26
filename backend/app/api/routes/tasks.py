from fastapi import APIRouter


from app.schemas.task import TaskRead


router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("", response_model=list[TaskRead])
def get_tasks():
    return []



