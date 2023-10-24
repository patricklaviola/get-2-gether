from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    group_name: str


class GroupOut(BaseModel):
    id: int
    group_name: str
    creator_id: int


class GroupRepository:
    def create(self, group: GroupIn, creator_id: int) -> GroupOut:
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
                    [group.group_name, creator_id],
                )
                id = result.fetchone()[0]
                return GroupOut(
                    id=id, group_name=group.group_name, creator_id=creator_id
                )

    def get(self, group_id: int) -> Union[Error, GroupOut]:
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
                    print("trying to delete")
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

    def get_groups_by_user(self, user_id: int) -> Union[Error, List[GroupOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        groups.id,
                        groups.group_name,
                        groups.creator_id
                        FROM groups
                        INNER JOIN
                        group_members ON groups.id = group_members.group_id
                        WHERE group_members.user_id = %s
                        ORDER BY groups.id;
                        """,
                        [user_id],
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
            return {"message": "Could not get groups for this user"}
