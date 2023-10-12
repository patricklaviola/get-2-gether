from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class GroupMemberIn(BaseModel):
    group_id: str
    user_id: int


class GroupMemberOut(BaseModel):
    id: int
    group_id: str
    user_id: int


class GroupMemberRepository:
    pass
