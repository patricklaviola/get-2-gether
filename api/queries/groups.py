from pydantic import BaseModel
from queries.pool import pool

class GroupIn(BaseModel):
    name: str
    user_id: int

class GroupOut(BaseModel):
    id: int
    name: str
    user_id: int


class GroupRepository:
    def create(self, group: GroupIn) -> GroupOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO groups
                        (name, user_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                        group.name,
                        group.user_id
                    ]
                )
                id = result.fetchone()[0]
                old_data = group.dict()
                return GroupOut(id=id, **old_data)
