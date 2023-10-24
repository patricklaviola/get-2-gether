from datetime import datetime
from pydantic import BaseModel, Field
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class MessageIn(BaseModel):
    message: str
    created_on: datetime = Field(default_factory=datetime.now)


class MessageOut(BaseModel):
    id: int
    message: str
    created_on: datetime = Field(default_factory=datetime.now)
    user_id: int
    group_id: int


class MessageUpdateOut(BaseModel):
    message: str
    created_on: datetime = Field(default_factory=datetime.now)


class MessageRepository:
    def create(
        self, message: MessageIn, user_id: int, group_id: int
    ) -> Union[MessageOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO messages
                            (message, created_on, user_id, group_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            message.message,
                            message.created_on,
                            user_id,
                            group_id,
                        ],
                    )
                    id = result.fetchone()[0]
                    return MessageOut(
                        id=id,
                        message=message.message,
                        created_on=message.created_on,
                        user_id=user_id,
                        group_id=group_id,
                    )
        except Exception:
            return {"message": "Could not create message"}

    def update(
        self, message_id: int, message: MessageIn
    ) -> Union[MessageOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE messages
                        SET message = %s
                            , created_on = %s
                        WHERE id = %s
                        """,
                        [message.message, message.created_on, message_id],
                    )
                    old_data = message.dict()
                    return MessageUpdateOut(id=message_id, **old_data)
        except Exception:
            return {"message": "Could not update message"}

    def get(self, group_id: int) -> Union[List[MessageOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT messages.id
                        , messages.message
                        , messages.created_on
                        , messages.user_id
                        , messages.group_id
                        FROM messages
                        WHERE messages.group_id = %s
                        ORDER BY messages.created_on ASC
                        """,
                        [group_id],
                    )
                    messages = []
                    for record in db:
                        message = MessageOut(
                            id=record[0],
                            message=record[1],
                            created_on=record[2],
                            user_id=record[3],
                            group_id=record[4],
                        )
                        messages.append(message)
                    return messages
        except Exception:
            return {"message": "Could not retrieve group messages"}

    def delete(self, message_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM messages
                        WHERE id = %s
                        """,
                        [message_id],
                    )
                    return True
        except Exception:
            return False
