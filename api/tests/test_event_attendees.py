from main import app
from queries.events.event_attendees import EventAttendeeRepository
from fastapi.testclient import TestClient
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {
        "id": 1,
        "user_name": "Patrick La Viola",
        "email": "patrick@example.com",
        "hashed_password": "$2b$12$d6R1b1tg0yGzIyzm/",
    }


class EmptyEventAttendeeRepository:
    def get_list_attendees(self):
        return []

    def get_attendee_list_for_event(self, event_id):
        return []


class CreateAttendeeRepository:
    def create_attendee(self, attendee):
        result = {"id": 1, "status": "Not Seen", "user_id": 1, "event_id": 1}
        result.update(attendee)
        return result


class UpdateAttendeeRepository:
    def update_attendee_status(self, attendee_id, status):
        result = {"id": 1, "status": "Yes", "user_id": 1, "event_id": 1}
        result.update(status)
        return result


def test_get_all_attendees():
    app.dependency_overrides[
        EventAttendeeRepository
    ] = EmptyEventAttendeeRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/attendees")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_create_attendee():
    app.dependency_overrides[
        EventAttendeeRepository
    ] = CreateAttendeeRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    json = {"user_id": 1, "event_id": 1}
    expected = {"id": 1, "status": "Not Seen", "user_id": 1, "event_id": 1}
    response = client.post("/attendees", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected


def test_get_attendee_list_for_event():
    app.dependency_overrides[
        EventAttendeeRepository
    ] = EmptyEventAttendeeRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    response = client.get("/events/1/attendees")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_update_attendee_status():
    app.dependency_overrides[
        EventAttendeeRepository
    ] = UpdateAttendeeRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    json = {"status": "Yes"}
    expected = {"id": 1, "status": "Yes", "user_id": 1, "event_id": 1}
    response = client.put("/attendees/1", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
