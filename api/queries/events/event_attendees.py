from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class EventAttendeeIn(BaseModel):
    user_id: int
    event_id: int


class EventAttendeeStatusIn(BaseModel):
    status: str


class EventAttendeeOut(BaseModel):
    id: int
    status: str
    user_id: int
    event_id: int


class EventAttendeeUserInfoOut(BaseModel):
    id: int
    status: str
    user_id: int
    event_id: int
    user_name: str


class EventAttendeeRepository:
    def create_attendee(
        self,
        attendee: EventAttendeeIn,
    ) -> Union[Error, EventAttendeeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO event_attendees
                            (status, user_id, event_id)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id
                        """,
                        ["Not Seen", attendee.user_id, attendee.event_id],
                    )
                    id = result.fetchone()[0]
                    return EventAttendeeOut(
                        id=id,
                        status="Not Seen",
                        user_id=attendee.user_id,
                        event_id=attendee.event_id,
                    )

        except Exception as e:
            print(e)
            return {"message": "Unable to create attendee"}

    def get_list_attendees(
        self,
    ) -> Union[Error, List[EventAttendeeUserInfoOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            event_attendees.id,
                            event_attendees.status,
                            event_attendees.user_id,
                            event_attendees.event_id,
                            users.user_name
                        FROM event_attendees
                        INNER JOIN users
                        ON event_attendees.user_id = users.id
                        ORDER BY event_id
                        """
                    )
                    attendees = []
                    for result in db:
                        attendee = EventAttendeeUserInfoOut(
                            id=result[0],
                            status=result[1],
                            user_id=result[2],
                            event_id=result[3],
                            user_name=result[4],
                        )
                        attendees.append(attendee)
                    return attendees
        except Exception as e:
            print(e)
            return {"message": "Unable to fetch attendees"}

    def get_attendee_list_for_event(
        self, event_id: int
    ) -> Union[Error, List[EventAttendeeUserInfoOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            event_attendees.id,
                            event_attendees.status,
                            event_attendees.user_id,
                            event_attendees.event_id,
                            users.user_name
                        FROM event_attendees
                        INNER JOIN users
                        ON event_attendees.user_id = users.id
                        WHERE event_attendees.event_id = %s
                        ORDER BY status
                        """,
                        [event_id],
                    )
                    attendees = []
                    for result in db:
                        attendee = EventAttendeeUserInfoOut(
                            id=result[0],
                            status=result[1],
                            user_id=result[2],
                            event_id=result[3],
                            user_name=result[4],
                        )
                        attendees.append(attendee)
                    return attendees
        except Exception as e:
            print(e)
            return {"message": "Unable to fetch attendees"}

    def update_attendee_status(
        self, attendee_id: int, status: EventAttendeeStatusIn
    ) -> Union[Error, EventAttendeeOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    record = db.execute(
                        """
                        UPDATE event_attendees
                        SET status=%s
                        WHERE id=%s
                        RETURNING *
                        """,
                        [
                            status.status,
                            attendee_id,
                        ],
                    )
                    result = record.fetchone()
                    return EventAttendeeOut(
                        id=result[0],
                        status=result[1],
                        user_id=result[2],
                        event_id=result[3],
                    )
        except Exception as e:
            print(e)
            return {"message": "Unable to fetch attendees"}

    def delete_event_attendee(self, user_id: int, event_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM event_attendees
                        WHERE user_id=%s AND event_id = %s
                        """,
                        [user_id, event_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
