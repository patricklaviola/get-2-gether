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

router = APIRouter(tags=["EventAttendees"])


@router.post(
    "/attendees",
    response_model=Union[Error, EventAttendeeOut],
)
def create_attendee(
    attendee: EventAttendeeIn,
    repo: EventAttendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.create_attendee(attendee)
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


@router.delete(
    "/users/{user_id}/event/{event_id}/attendees", response_model=bool
)
def delete_event_attendee(
    user_id: int,
    event_id: int,
    repo: EventAttendeeRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_event_attendee(user_id, event_id)
