from main import app
from queries.groups.groups import GroupRepository
from fastapi.testclient import TestClient
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 1,
        "user_name": "Eliza Ackroyd",
        "email": "eliza@example.com",
        "hashed_password": "$2b$12$d6R1b1tg0yGzIyzm/",
    }


class EmptyGroupRepository:
    def list_groups(self):
        return []


class CreateGroupRepository:
    def create(self, group, creator_id):
        result = {"id": 3, "creator_id": 1}
        result.update(group)
        return result


def test_get_all_groups():
    app.dependency_overrides[GroupRepository] = EmptyGroupRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.get("/groups")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_group():
    app.dependency_overrides[GroupRepository] = CreateGroupRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    json = {"group_name": "New Group"}

    expected = {"id": 3, "group_name": "New Group", "creator_id": 1}

    response = client.post("/groups", json=json)
    assert response.status_code == 200
    assert response.json() == expected
