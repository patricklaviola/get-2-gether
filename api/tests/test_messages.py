from main import app
from queries.groups.messages import MessageRepository
from fastapi.testclient import TestClient
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 1,
        "user_name": "Veronica Anaya",
        "email": "veronica@gmail.com",
        "hashed_password": "password",
    }


class CreateMessageRepository:
    def create(self, message, user_id, group_id):
        result = {
            "id": 1,
            "user_id": 1,
            "user_name": "Veronica Anaya",
            "group_id": 1,
        }
        result.update(message)
        return result


def test_create_message():
    app.dependency_overrides[MessageRepository] = CreateMessageRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    json = {
        "message": "Hello world!",
        "created_on": "2023-10-18 22:14:45",
    }

    expected = {
        "id": 1,
        "message": "Hello world!",
        "created_on": "2023-10-18T22:14:45",
        "user_id": 1,
        "user_name": "Veronica Anaya",
        "group_id": 1,
    }

    response = client.post("/groups/1/messages", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class EmptyMessageRepository:
    def get(self, group_id):
        return []


def test_get_all_messages():
    app.dependency_overrides[MessageRepository] = EmptyMessageRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    group_id = 1
    response = client.get(f"/groups/{group_id}/messages")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


class DeleteMessageRepository:
    def delete(self, message_id):
        return True


def test_delete_message():
    app.dependency_overrides[MessageRepository] = DeleteMessageRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = True

    message_id = 1
    response = client.delete(f"/messages/{message_id}")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


class UpdateMessageRepository:
    def update(self, message_id, message):
        result = {
            "id": 1,
            "message_id": 1,
        }
        result.update(message)
        return result


def test_update_message():
    app.dependency_overrides[MessageRepository] = UpdateMessageRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    json = {
        "message": "Bye!",
        "created_on": "2023-10-18 22:14:45",
    }

    expected = {
        "message": "Bye!",
        "created_on": "2023-10-18T22:14:45",
    }

    response = client.put("/messages/1", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
