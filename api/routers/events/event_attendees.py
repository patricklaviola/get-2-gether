from queries.events.event_attendees import (
    EventAttendeeIn,
    EventAttendeeOut,
    EventAttendeeStatusIn,
    EventAttendeeUserInfoOut,
    EventAttendeeRepository,
    Error,
)
from fastapi import APIRouter, Depends, Response

from authenticator import authenticator
from typing import List, Union

router = APIRouter()


@router.post("/attendees", response_model=Union[Error, EventAttendeeOut])
def create_attendee(
    attendee: EventAttendeeIn,
    response: Response,
    repo: EventAttendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["id"]
    result = repo.create_attendee(attendee, user_id)
    if result is None:
        response.status_code = 400
    return result


@router.get(
    "/attendees", response_model=Union[Error, List[EventAttendeeUserInfoOut]]
)
def get_all_attendees(
    response: Response,
    repo: EventAttendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.get_list_attendees()
    if result is None:
        response.status_code = 400
    return result


@router.get(
    "/events/{event_id}/attendees",
    response_model=Union[Error, List[EventAttendeeUserInfoOut]],
)
def get_attendee_list_for_event(
    event_id: int,
    response: Response,
    repo: EventAttendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.get_attendee_list_for_event(event_id)
    if result is None:
        response.status_code = 400
    return result


@router.put(
    "/attendees/{attendee_id}", response_model=Union[Error, EventAttendeeOut]
)
def update_attendee_status(
    attendee_id: int,
    status: EventAttendeeStatusIn,
    response: Response,
    repo: EventAttendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.update_attendee_status(attendee_id, status)
    if result is None:
        response.status_code = 400
    return result
