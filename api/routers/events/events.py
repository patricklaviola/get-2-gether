from api.queries.events.events import EventIn, EventOut, EventRepository, Error
from fastapi import APIRouter, Depends

# from authenticator import authenticator
from typing import List, Union

router = APIRouter()
