from api.queries.groups.group_members import (
    GroupMemberIn,
    GroupMemberOut,
    GroupMemberRepository,
    Error,
)
from fastapi import APIRouter, Depends

# from authenticator import authenticator
from typing import List, Union

router = APIRouter()
