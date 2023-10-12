from api.queries.events.event_attendees import (
    EventAttendeeIn,
    EventAttendeeOut,
    EventAttendeeRepository,
)
from fastapi import APIRouter, Depends

# from authenticator import authenticator
from typing import List, Union

router = APIRouter()
