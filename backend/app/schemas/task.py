from enum import Enum


from datetime import date as Date, time as Time


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
    date: Date
    start_time: Time | None = None
    estimated_minutes: int | None = Field(default=None, gt=0)
    status: TaskStatus = TaskStatus.planned


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: int


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    description: str | None = Field(default=None)
    date: Date | None = Field(default=None)
    start_time: Time | None = Field(default=None)
    estimated_minutes: int | None = Field(default=None, gt=0)
    status: TaskStatus | None = Field(default=None)