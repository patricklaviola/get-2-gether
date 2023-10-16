from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union
from datetime import datetime


class Error(BaseModel):
    message: str


class EventIn(BaseModel):
    title: str
    location: str
    image_url: str
    event_time_date: datetime
    description: str


class EventOut(BaseModel):
    id: int
    title: str
    location: str
    image_url: str
    event_time_date: datetime
    description: str
    group_id: int
    creator_id: int


class EventOutWithStatus(BaseModel):
    id: int
    title: str
    location: str
    image_url: str
    event_time_date: datetime
    description: str
    group_id: int
    creator_id: int
    status: str


class EventRepository:
    def create_event(
        self, event: EventIn, group_id: int, creator_id: int
    ) -> EventOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO events
                        (
                            title,
                            location,
                            image_url,
                            event_time_date,
                            description,
                            group_id,
                            creator_id
                        )
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        event.title,
                        event.location,
                        event.image_url,
                        event.event_time_date,
                        event.description,
                        group_id,
                        creator_id,
                    ],
                )
                id = result.fetchone()[0]
                old_data = event.dict()
                return EventOut(
                    id=id, **old_data, group_id=group_id, creator_id=creator_id
                )

    def update_event(
        self, event: EventIn, event_id: int
    ) -> Union[EventOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE events
                        SET
                            title = %s,
                            location = %s,
                            image_url = %s,
                            event_time_date = %s,
                            description = %s
                        WHERE id = %s
                        RETURNING *;
                        """,
                        [
                            event.title,
                            event.location,
                            event.image_url,
                            event.event_time_date,
                            event.description,
                            event_id,
                        ],
                    )
                    record = result.fetchone()
                    if record is None:
                        return Error(
                            message="Event not found or not authorized"
                        )
                    return EventOut(
                        id=record[0],
                        group_id=record[6],
                        creator_id=record[7],
                        **event.dict()
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not update event"}

    def delete_event(self, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print("trying to delete event")
                    db.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_event_details(self, event_id: int) -> EventOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, title, location, image_url, event_time_date, description, group_id, creator_id
                        FROM events
                        WHERE events.id = %s
                        """,
                        [event_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return EventOut(
                        id=record[0],
                        title=record[1],
                        location=record[2],
                        image_url=record[3],
                        event_time_date=record[4],
                        description=record[5],
                        group_id=record[6],
                        creator_id=record[7],
                    )
        except Exception as e:
            print(e)
            return {"message": "Event not found"}

    def get_all_events_by_group(
        self, group_id: int
    ) -> Union[Error, List[EventOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM events
                        WHERE group_id = %s
                        ORDER BY id;
                        """,
                        [group_id],
                    )
                    result = []
                    for record in db:
                        event = EventOut(
                            id=record[0],
                            title=record[1],
                            location=record[2],
                            image_url=record[3],
                            event_time_date=record[4],
                            description=record[5],
                            group_id=record[6],
                            creator_id=record[7],
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get events for this group"}

    def get_all_events_by_user(
        self, user_id: int
    ) -> Union[Error, List[EventOutWithStatus]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        e.id,
                        e.title,
                        e.location,
                        e.image_url,
                        e.event_time_date,
                        e.description,
                        e.group_id,
                        e.creator_id,
                        ea.status
                        FROM events e
                        INNER JOIN event_attendees ea ON e.id = ea.event_id
                        WHERE ea.user_id = %s
                        ORDER BY e.id;
                        """,
                        [user_id],
                    )
                    result = []
                    for record in db:
                        event = EventOutWithStatus(
                            id=record[0],
                            title=record[1],
                            location=record[2],
                            image_url=record[3],
                            event_time_date=record[4],
                            description=record[5],
                            group_id=record[6],
                            creator_id=record[7],
                            status=record[8],
                        )
                        result.append(event)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get events for this group"}
