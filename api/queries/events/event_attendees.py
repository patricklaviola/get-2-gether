from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class EventAttendeeIn(BaseModel):
    status: str
    user_id: int
    event_id: int


class EventAttendeeOut(BaseModel):
    id: int
    status: str
    user_id: int
    event_id: int


class EventAttendeeRepository:
    pass
