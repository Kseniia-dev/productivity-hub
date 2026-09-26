from enum import Enum


from datetime import date, time


from pydantic import BaseModel, Field


class TaskStatus(str, Enum):
    planned = "planned"
    in_progress = "in_progress"
    done = "done"
    undone = "undone"
    cancelled = "cancelled"


class TaskBase(BaseModel):
    title: str = Field(min_length=1)
    description: str | None = None
    date: date
    start_time: time | None = None
    estimated_minutes: int | None = Field(default=None, gt=0)
    status: TaskStatus = TaskStatus.planned


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: int
