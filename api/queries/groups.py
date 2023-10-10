from pydantic import BaseModel
from queries.pool import pool

class Error(BaseModel):
    message: str


class GroupIn(BaseModel):
    name: str
    user_id: int


class GroupOut(BaseModel):
    id: int
    name: str
    user_id: int


class GroupOutMembers(BaseModel):
    id: int
    name: str
    group_members: list

class GroupMemberIn(BaseModel):
    user_id: int
    group_id: int

class GroupMemberOut(BaseModel):
    group_members: list



class GroupRepository:
    def record_to_group_out(self, record, record_members) -> GroupOutMembers:
        group_dict = {
            "id": record[0],
            "name": record[1],
            "group_members": self.record_to_group_members_out(record_members)
        }
        return group_dict

    def record_to_group_members_out(self, record_members) -> GroupMemberOut:
        member_list = []
        for row in record_members:
            member_d = {"user_id": row[0], "full_name": row[1]}
            member_list.append(member_d)
        return member_list

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

    def get(self, group_id: int) -> GroupOutMembers:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result_group = db.execute(
                        """
                        SELECT id, name
                        FROM groups
                        WHERE groups.id = %s
                        """,
                        [group_id]
                    )
                    record = result_group.fetchone()
                    result_members = db.execute(
                        """
                        SELECT group_members.user_id, users.full_name
                        FROM group_members
                        INNER JOIN users
                        ON (users.id = group_members.user_id)
                        WHERE group_members.group_id = %s
                        """,
                        [group_id]
                    )
                    record_members = result_members.fetchall()
                    if record is None:
                        return None
                    return self.record_to_group_out(record, record_members)
        except Exception as e:
            print(e)
            return False

    def delete(self, group_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM groups
                        WHERE id = %s
                        """,
                        [group_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
