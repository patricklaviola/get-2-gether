from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    title: str
    location: str
    image_url: str
    event_time_date: str
    description: str
    group_id: int
    creator_id: int


class EventOut(BaseModel):
    id: int
    location: str
    image_url: str
    event_time_date: str
    description: str
    group_id: int
    creator_id: int


class EventRepository:
    def create_event(self, event: EventIn) -> EventOut:
        pass

    def get_event(self, event_id: int) -> EventOut:
        pass

    def get_all_events(self) -> Union[Error, List[EventOut]]:
        pass

    def delete_event(self, event_id: int) -> bool:
        pass
