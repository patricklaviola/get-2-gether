from queries.events.events import (
    EventIn,
    EventOut,
    EventRepository,
    Error,
    EventOutWithStatus,
)
from fastapi import APIRouter, Depends

from authenticator import authenticator
from typing import List, Union

router = APIRouter()


@router.post("/groups/{group_id}/events")
def create_event(
    group_id: int,
    event: EventIn,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    creator_id = account_data["id"]
    return repo.create_event(event, group_id, creator_id)


@router.put(
    "/events/{event_id}",
    response_model=Union[EventOut, Error],
)
def update_event(
    event: EventIn,
    event_id: int,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[EventOut, Error]:
    return repo.update_event(event, event_id)


@router.delete("/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_event(event_id)


@router.get("/events/{event_id}", response_model=EventOut)
def get_event_details(
    event_id: int,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> EventOut:
    return repo.get_event_details(event_id)


@router.get(
    "/groups/{group_id}/events", response_model=Union[Error, List[EventOut]]
)
def get_all_events_by_group(
    group_id: int,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_events_by_group(group_id)


@router.get(
    "/users/{user_id}/events",
    response_model=Union[Error, List[EventOutWithStatus]],
)
def get_all_events_by_user(
    user_id: int,
    repo: EventRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_events_by_user(user_id)
