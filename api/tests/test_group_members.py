from main import app
from queries.groups.group_members import (
    GroupMemberRepository,
    GroupMemberInfoOut,
    GroupMemberOut,
)
from fastapi.testclient import TestClient
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 4,
        "user_name": "Hello World",
        "email": "test@test.com",
        "hashed_password": "password@1234",
    }


class CreateGroupMemberRepository:
    def create_group_member(self, group_member, user_id):
        return GroupMemberOut(
            id=7,
            group_id=group_member.group_id,
            user_id=group_member.user_id,
        )


def test_create_group_member():
    app.dependency_overrides[
        GroupMemberRepository
    ] = CreateGroupMemberRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = {"id": 7, "group_id": 1, "user_id": 4}

    response = client.post(
        "/group_members", json={"group_id": 1, "user_id": 4}
    )
    assert response.status_code == 200
    assert response.json() == expected


class GetGroupMemberRepository:
    def get_group_member(self, group_member_id):
        return GroupMemberInfoOut(
            id=7,
            group_name="Group Name",
            user_name="Hello World",
            email="test@test.com",
            user_id=group_member_id,
            group_id=1,
        )


def test_get_group_member():
    app.dependency_overrides[GroupMemberRepository] = GetGroupMemberRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = {
        "id": 7,
        "group_name": "Group Name",
        "user_name": "Hello World",
        "email": "test@test.com",
        "user_id": 4,
        "group_id": 1,
    }

    response = client.get("/group_members/4")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class GetAllGroupMembersRepository:
    def get_all_group_members(self):
        return [
            GroupMemberInfoOut(
                id=7,
                group_name="Group Name",
                user_name="Hello World",
                email="test@test.com",
                user_id=4,
                group_id=1,
            )
        ]


def test_get_all_group_members():
    app.dependency_overrides[
        GroupMemberRepository
    ] = GetAllGroupMembersRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = [
        {
            "id": 7,
            "group_name": "Group Name",
            "user_name": "Hello World",
            "email": "test@test.com",
            "user_id": 4,
            "group_id": 1,
        }
    ]

    response = client.get("/group_members")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class GetAllGroupMembersByGroupIDRepository:
    def get_group_members_list_for_group(self, group_id):
        return [
            GroupMemberInfoOut(
                id=7,
                group_name="Group Name",
                user_name="Hello World",
                email="test@test.com",
                user_id=4,
                group_id=1,
            )
        ]


def test_get_all_group_members_by_group_id():
    app.dependency_overrides[
        GroupMemberRepository
    ] = GetAllGroupMembersByGroupIDRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = [
        {
            "id": 7,
            "group_name": "Group Name",
            "user_name": "Hello World",
            "email": "test@test.com",
            "user_id": 4,
            "group_id": 1,
        }
    ]

    response = client.get("/groups/7/group_members")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class DeleteGroupMembersRepository:
    def delete_group_member(self, id):
        return True


def test_delete_group_member():
    app.dependency_overrides[
        GroupMemberRepository
    ] = DeleteGroupMembersRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = True

    response = client.delete("/group_members/7")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
