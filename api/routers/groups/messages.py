from queries.groups.messages import (
    MessageRepository,
    MessageOut,
    MessageIn,
    Error,
)
from fastapi import APIRouter, Depends

# from authenticator import authenticator
from typing import List, Union

router = APIRouter()
