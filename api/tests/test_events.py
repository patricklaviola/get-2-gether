from main import app
from queries.events.events import EventRepository
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


class EmptyEventRepository:
    def get_all_events_by_group(self, group_id):
        return []

    def get_all_events_by_user(self, user_id):
        result = []
        return result


class CreateEventRepository:
    def create_event(self, event, group_id, creator_id):
        result = {"id": 2, "group_id": 1, "creator_id": 1}
        result.update(event)
        return result


class GetEventRepository:
    def get_event_details(self, event_id):
        result = {
            "id": 2,
            "title": "Another Event",
            "location": "My House",
            "image_url": "https://static.wikia.nocookie.net/",
            "event_time_date": "2023-10-17T21:46:47.079000",
            "description": "This will be a fun hang under the sea",
            "group_id": 1,
            "creator_id": 1,
        }
        return result


class DeleteEventRepository:
    def delete_event(self, event_id):
        result = True
        return result


def test_get_all_events_by_group():
    app.dependency_overrides[EventRepository] = EmptyEventRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/groups/1/events")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_event():
    app.dependency_overrides[EventRepository] = CreateEventRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    json = {
        "title": "Another Event",
        "location": "My House",
        "image_url": "https://static.wikia.nocookie.net/",
        "event_time_date": "2023-10-17T21:46:47.079Z",
        "description": "This will be a fun hang under the sea",
    }

    expected = {
        "id": 2,
        "title": "Another Event",
        "location": "My House",
        "image_url": "https://static.wikia.nocookie.net/",
        "event_time_date": "2023-10-17T21:46:47.079000+00:00",
        "description": "This will be a fun hang under the sea",
        "group_id": 1,
        "creator_id": 1,
    }

    response = client.post("/groups/1/events", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_event_details():
    app.dependency_overrides[EventRepository] = GetEventRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    expected = {
        "id": 2,
        "title": "Another Event",
        "location": "My House",
        "image_url": "https://static.wikia.nocookie.net/",
        "event_time_date": "2023-10-17T21:46:47.079000",
        "description": "This will be a fun hang under the sea",
        "group_id": 1,
        "creator_id": 1,
    }

    response = client.get("/events/2")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_all_events_by_user():
    app.dependency_overrides[EventRepository] = EmptyEventRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.get("/users/1/events")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_delete_event():
    app.dependency_overrides[EventRepository] = DeleteEventRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    response = client.delete("/events/1")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json()
