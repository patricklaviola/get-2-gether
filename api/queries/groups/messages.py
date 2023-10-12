from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class MessageIn(BaseModel):
    message: str
    user_id: int


class MessageOut(BaseModel):
    id: int
    message: str
    created_on: str
    user_id: int


class MessageRepository:
    pass
