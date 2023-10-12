from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    group_name: str
    creator_id: int


class GroupOut(BaseModel):
    id: int
    group_name: str
    creator_id: int


class GroupRepository:
    def create(self, group: GroupIn) -> GroupOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO groups
                        (group_name, creator_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [group.group_name, group.creator_id],
                )
                id = result.fetchone()[0]
                old_data = group.dict()
                return GroupOut(id=id, **old_data)

    def get(self, group_id: int) -> GroupOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result_group = db.execute(
                        """
                        SELECT id, group_name, creator_id
                        FROM groups
                        WHERE groups.id = %s
                        """,
                        [group_id],
                    )
                    record = result_group.fetchone()
                    if record is None:
                        return None
                    return GroupOut(
                        id=record[0],
                        group_name=record[1],
                        creator_id=record[2],
                    )
        except Exception as e:
            print(e)
            return {"message": "Group not found"}

    def delete(self, group_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM groups
                        WHERE id = %s
                        """,
                        [group_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def list_groups(self) -> Union[Error, List[GroupOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, group_name, creator_id
                        FROM groups
                        ORDER BY id;
                        """
                    )
                    result = []
                    for record in db:
                        group = GroupOut(
                            id=record[0],
                            group_name=record[1],
                            creator_id=record[2],
                        )
                        result.append(group)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all groups"}
