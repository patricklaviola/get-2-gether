## Account Endpoints
<details><summary>Create Account (Sign Up)</summary>

  - Endpoint path: /api/accounts
  - Endpoint method: POST

  - Request shape (JSON):
    ```json
    {
      "user_name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - Response: Creates new user account

  - Response shape (JSON):
    ```json
    {
      "access_token": "string",
      "token_type": "string",
      "account": {
        "id": int,
        "user_name": "string",
        "email": "string"
      }
    }
    ```
</details>

<details><summary>Get Token</summary>

  - Endpoint path: /token
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token

  - Response: Returns access token

  - Response shape (JSON):
    ```json
    {
      "access_token": "string",
      "token_type": "Bearer",
      "account": {
        "id": int,
        "user_name": "string",
        "email": "string"
      }
    }
    ```
</details>

<details><summary>User Log In (Login)</summary>

  - Endpoint path: /token
  - Endpoint method: POST

  - Request shape (form):
    - username: string
    - password: string

  - Response: Account information and a token

  - Response shape (JSON):
    ```json
      {
        "account": {
          «key»: type»,
        },
        "token": string
      }
    ```
</details>

<details><summary>Log a User Out (Logout)</summary>

  - Endpoint path: /token
  - Endpoint method: DELETE

  - Headers:
    - Authorization: Bearer token

  - Response: Always true

  - Response shape (JSON):
    ```json
      true
    ```
</details>

<details><summary>Get All Accounts</summary>

  - Endpoint path: /accounts
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token

  - Response: A list of all user accounts

  - Response shape (JSON):

    ```json
    [
      {
        "id": int,
        "user_name": "string",
        "email": "string"
      }
    ]
    ```

</details>

## Messages Endpoints
<details><summary>Create Message</summary>

  - Endpoint path: /groups/{group_id}/messages
  - Endpoint method: POST
  - Query parameters:
    - group_id: needed to create a message for a specific group

  - Headers:
    - Authorization: Bearer token

  - Request body:
    ```json
    {
      "message": "string",
      "created_on": "YYYY-MM-DDTHH:MM:SS",
    }
    ```
  - Response: Creates new message and returns message details

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "message": "string",
      "created_on": "YYYY-MM-DDTHH:MM:SS",
      "user_id": int,
      "user_name": "string",
      "group_id": int,
    }
    ```
</details>

<details><summary>Get Messages By Group ID</summary>

  - Endpoint path: /groups/{group_id}/messages
  - Endpoint method: GET
  - Query parameters:
    - group_id: needed to retrieve messages for a specific group

  - Headers:
    - Authorization: Bearer token

  - Response: A list of messages for a given group

  - Response shape (JSON):

    ```json
    [
      {
        "id": int,
        "message": "string",
        "created_on": "YYYY-MM-DDTHH:MM:SS",
        "user_id": int,
        "user_name": "string",
        "group_id": int,
      }
    ]
    ```
</details>

<details><summary>Update Message</summary>

  - Endpoint path: /messages/{message_id}
  - Endpoint method: PUT
  - Query parameters:
    - message_id: needed to update a specific message

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "message": "string",
      "created_on": "YYYY-MM-DDTHH:MM:SS"
    }
    ```

  - Response: Update a message by message_id

  - Response shape (JSON):

    ```json
    {
      "message": "string",
      "created_on": "YYYY-MM-DDTHH:MM:SS",
    }
    ```
</details>

<details><summary>Delete Message</summary>

  - Endpoint path: /messages/{message_id}
  - Endpoint method: DELETE
  - Query parameters:
    - message_id: needed to delete a specific message

  - Headers:
    - Authorization: Bearer token

  - Response: Delete a message by message_id

  - Response shape (JSON):

  ```json
  true
  ```
</details>

## Groups Endpoints
<details><summary>Create Group</summary>

  - Endpoint path: /groups
  - Endpoint method: POST

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "group_name": "string"
    }
    ```

  - Response: Successfully creates a new group

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "group_name": "string",
      "creator_id": int
    }
    ```
</details>

<details><summary>Get All Groups</summary>

  - Endpoint path: /groups
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token

  - Response: List of all groups

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "group_name": "string",
        "creator_id": int
      }
    ]
    ```
</details>

<details><summary>Get Groups By User</summary>

  - Endpoint path: /user/{user_id}/groups
  - Endpoint method: GET
  - Query parameters:
    - user_id: directs path to a specific users groups

  - Headers:
    - Authorization: Bearer token

  - Response: List of groups by user

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "group_name": "string",
        "creator_id": int
      }
    ]
    ```
</details>

<details><summary>Get Group</summary>

  - Endpoint path: /groups/{group_id}
  - Endpoint method: GET
  - Query parameters:
    - group_id: directs path to specific group

  - Headers:
    - Authorization: Bearer token

  - Response: Group details

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "group_name": "string",
      "creator_id": int
    }
    ```
</details>

<details><summary>Delete Group</summary>

  - Endpoint path: /groups/{group_id}
  - Endpoint method: DELETE
  - Query parameters:
    - group_id: needed to delete specific group

  - Headers:
    - Authorization: Bearer token

  - Response: Successfully deletes group

  - Response shape (JSON):
    ```json
    true
    ```
</details>

## Group Members Endpoints
<details><summary>Get All Group Members</summary>

  - Endpoint path: /group_members
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token

  - Response: List of all group members

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "group_name": "string",
        "user_name": "string",
        "email": "string",
        "user_id": int,
        "group_id": int
      }
    ]
    ```
</details>

<details><summary>Create Group Member</summary>

  - Endpoint path: /group_members
  - Endpoint method: POST

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "group_id": int,
      "user_id": int
    }
    ```
  - Response: Adds a user to a group

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "group_id": int,
      "user_id": int
    }
    ```
</details>

<details><summary>Get Group Member</summary>

  - Endpoint path: /group_members/{id}
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token
  - Query parameters:
    - id: needed to return a specific group member

  - Response: Returns a group member

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "group_name": "sting",
      "user_name": "string",
      "email": "string",
      "user_id": int,
      "group_id": int
    }
    ```
</details>

<details><summary>Get Group Members List For Group</summary>

  - Endpoint path: /groups/{group_id}/group_members
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token
  - Query parameters:
    - group_id: needed to fetch a list of group members for a specific group

  - Response: Returns a list of all group members in a specific group

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "group_name": str,
        "user_name": str,
        "email": str,
        "user_id": int,
        "group_id": int
      }
    ]
    ```
</details>

<details><summary>Get Friends By User</summary>


  - Endpoint path: /users/{user_id}/friends
  - Endpoint method: GET
  - Query parameter:
    - user_id: needed to return a list of friends for a specific user

  - Headers:
    - Authorization: Bearer token

  - Response: Returns a list of friends for a specific user

  - Response shape (JSON):
    ```json
    [
      {
        "user_name": "string",
        "email": "string",
        "user_id": int
      }
    ]
    ```
</details>

<details><summary>Delete Group Member</summary>

  - Endpoint path: /group_members/{id}
  - Endpoint method: DELETE

  - Headers:
    - Authorization: Bearer token
  - Query parameters:
    - id: group member id needed to delete specific group member

  - Response: Successfully deletes a specific group member

  - Response shape (JSON):
    ```json
    true
    ```
</details>

## Events Endpoints
<details><summary>Create Event</summary>

  - Endpoint path: /groups/{group_id}/events
  - Endpoint method: POST
  - Query parameters:
    - group_id: needed to create an event for a specific group

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "title": "string",
      "location": "string",
      "image_url": "string",
      "event_time_date": "YYYY-MM-DDTHH:MM:SS",
      "description": "string"
    }
    ```

  - Response: JSON Message indicating successfull event creation

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "title": "string",
      "location": "string",
      "image_url": "string",
      "event_time_date": "YYYY-MM-DDTHH:MM:SS",
      "description": "string",
      "group_id": int,
      "creator_id": int
    }
    ```
</details>

<details><summary>Update Event</summary>

  - Endpoint path: /events/{event_id}
  - Endpoint method: PUT
  - Query parameters:
    - event_id: needed to update a specific event

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "title": "string",
      "location": "string",
      "image_url": "string",
      "event_time_date": "YYYY-MM-DDTHH:MM:SS",
      "description": "string"
    }
    ```
  - Response: Updated event detail with changed information reflected

  - Response shape (JSON):
    ```json
    {
      "id": "int",
      "title": "string",
      "location": "string",
      "image_url": "string",
      "event_time_date": "YYYY-MM-DDTHH:MM:SS",
      "description": "string",
      "group_id": "int",
      "creator_id": "int"
    }
    ```
</details>

<details><summary>Get Event Details</summary>

  - Endpoint path: /events/{event_id}
  - Endpoint method: GET
  - Query parameters:
    - event_id: needed to return details for a specific event

  - Headers:
    - Authorization: Bearer token

  - Response: Details of selected event

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "title": "string",
      "location": "string",
      "image_url": "string",
      "event_time_date": "YYYY-MM-DDTHH:MM:SS",
      "description": "string",
      "group_id": int,
      "creator_id": int
    }
    ```
</details>

<details><summary>Get All Events By Group</summary>

  - Endpoint path: /groups/{group_id}/events
  - Endpoint method: GET
  - Query parameters:
    - group_id: needed to return a list of events for a specific group

  - Headers:
    - Authorization: Bearer token

  - Response: List of events associated with a specific group

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "title": "string",
        "location": "string",
        "image_url": "string",
        "event_time_date": "YYYY-MM-DDTHH:MM:SS",
        "description": "string",
        "group_id": int,
        "creator_id": int
      }
    ]
    ```
</details>

<details><summary>Get All Events By User</summary>

  - Endpoint path: /users/{user_id}/events
  - Endpoint method: GET
  - Query parameters:
    - user_id: needed to return a list of events for a specific user

  - Headers:
    - Authorization: Bearer token

  - Response: List of events associated with a specific user

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "title": "string",
        "location": "string",
        "image_url": "string",
        "event_time_date": "YYYY-MM-DDTHH:MM:SS",
        "description": "string",
        "group_id": int,
        "creator_id": int,
        "status": "string"
      }
    ]
    ```
</details>

<details><summary>Delete Event</summary>

  - Endpoint path: /events/{event_id}
  - Endpoint method: DELETE
  - Query parameters:
    - event_id: needed to delete specific event

  - Headers:
    - Authorization: Bearer token

  - Response: Confirmation that selected event has been deleted

  - Response shape (JSON):
    ```json
    true
    ```
</details>

## Event Attendees Endpoints

<details><summary>Create Attendee</summary>

  - Endpoint path: /attendees
  - Endpoint method: POST

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "user_id": int,
      "event_id": int
    }
    ```
  - Response: Returned JSON that has information for specific event with: event and user ids, and a default user event status that is "Not Seen"

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "status": "Not Seen",
      "user_id": int,
      "event_id": int
    }
    ```
</details>

<details><summary>Get Attendee List for Event</summary>

  - Endpoint path: /events/{event_id}/attendees
  - Endpoint method: GET
  - Query parameters:
    - event_id: needed to return a list of attendees for a specific event

  - Headers:
    - Authorization: Bearer token

  - Response: Returned JSON that has a list of event attendents with the users name, ordered by their status, i.e. "going" vs "not going" vs "not seen"

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "status": "string",
        "user_id": int,
        "event_id": int,
        "user_name": "string"
      }, ...
    ]
    ```
</details>

<details><summary>Get All Attendees</summary>

  - Endpoint path: /attendees
  - Endpoint method: GET

  - Headers:
    - Authorization: Bearer token

  - Response: Returned JSON that has a list of all event attendents

  - Response shape (JSON):
    ```json
    [
      {
        "id": int,
        "status": "string",
        "user_id": int,
        "event_id": int,
        "user_name": "string"
      }, ...
    ]
    ```
</details>

<details><summary>Update Attendee Status</summary>

  - Endpoint path: /attendees/{attendee_id}
  - Endpoint method: PUT
  - Query parameters:
    - attendee_id: needed to update a specific attendee's status

  - Headers:
    - Authorization: Bearer token

  - Request shape (JSON):
    ```json
    {
      "status": "Going/Not Going/Maybe"
    }
    ```
  - Response: Updated event attendee detail with changed status information reflected

  - Response shape (JSON):
    ```json
    {
      "id": int,
      "status": "string",
      "user_id": int,
      "event_id": int
    }
    ```
  </details>
