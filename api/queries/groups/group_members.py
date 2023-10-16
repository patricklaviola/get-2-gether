from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class GroupMemberIn(BaseModel):
    group_id: int
    user_id: int


class GroupMemberOut(BaseModel):
    id: int
    group_id: int
    user_id: int


class GroupMemberInfoOut(BaseModel):
    id: int
    group_name: str
    user_name: str
    email: str
    user_id: int


class GroupMemberRepository:
    def create_group_member(
        self, group_member: GroupMemberIn, user_id: int
    ) -> GroupMemberOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO group_members
                            (group_id, user_id)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [group_member.group_id, group_member.user_id],
                    )
                    id = result.fetchone()[0]
                    old_data = group_member.dict()
                    return GroupMemberOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"Message: Unable to create group member"}

    def get_group_member(self, id: int) -> Union[Error, GroupMemberInfoOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT group_members.id
                        , groups.group_name
                        , users.user_name
                        , users.email
                        , group_members.user_id
                        FROM group_members
                        INNER JOIN users
                        ON group_members.user_id = users.id
                        INNER JOIN groups
                        ON group_members.group_id = groups.id
                        WHERE group_members.id = %s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return GroupMemberInfoOut(
                        id=record[0],
                        group_name=record[1],
                        user_name=record[2],
                        email=record[3],
                        user_id=record[4],
                    )
        except Exception as e:
            print(e)
            return {"message": "Group member not found"}

    def get_group_members_list_for_group(
        self, group_id: int
    ) -> Union[Error, List[GroupMemberInfoOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT group_members.id
                        , groups.group_name
                        , users.user_name
                        , users.email
                        , group_members.user_id
                        FROM group_members
                        INNER JOIN users
                        ON group_members.user_id = users.id
                        INNER JOIN groups
                        ON group_members.group_id = groups.id
                        WHERE group_members.group_id = %s
                        """,
                        [group_id],
                    )
                    group_members = []
                    for result in db:
                        group_member = GroupMemberInfoOut(
                            id=result[0],
                            group_name=result[1],
                            user_name=result[2],
                            email=result[3],
                            user_id=result[4],
                        )
                        group_members.append(group_member)
                    return group_members
        except Exception as e:
            print(e)
            return {"Message: Could not get all groups "}

    def get_all_group_members(self) -> Union[Error, List[GroupMemberInfoOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT group_members.id
                        , groups.group_name
                        , users.user_name
                        , users.email
                        , group_members.user_id
                        FROM group_members
                        INNER JOIN users
                        ON group_members.user_id = users.id
                        INNER JOIN groups
                        ON group_members.group_id = groups.id
                        """
                    )
                    group_members = []
                    for result in db:
                        group_member = GroupMemberInfoOut(
                            id=result[0],
                            group_name=result[1],
                            user_name=result[2],
                            email=result[3],
                            user_id=result[4],
                        )
                        group_members.append(group_member)
                    return group_members
        except Exception as e:
            print(e)
            return {"message": "Could not get all group members"}

    def delete_group_member(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM group_members
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
