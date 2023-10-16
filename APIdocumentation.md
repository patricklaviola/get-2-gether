<!----------- ACCOUNT ----------->

### Create Account (Sign Up)

- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  - user_name: string
  - email: string
  - password: string

- Response: User information and token

- Response shape (JSON):
  ```json
  {
    "account": {
      "id": int,
      "user_name": string,
      "email": string
    }
  }
  ```

### User Log in (Log In)

- Endpoint path: /token
- Endpoint method: POST

- Request shape (form):

  - email: string
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

### Log a User Out (Log Out)

- Endpoint path: /token
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
  ```

<!----------- Messages ----------->

### Create a message

- Endpoint path: /groups/{group_id}/messages
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:
  ```json
  {
      "message": string,
  }
  ```
- Response: An indication of success or failure

- Response shape (JSON):
  ```json
  {
      "id": int,
      "message": string,
      "created_on": "YYYY-MM-DDTHH:MM:SS",
      "user_id": int,
      "group_id": int,
  }
  ```

### Display/get list of messages for the group, display in chronological order

- Endpoint path: /groups/{group_id}/messages
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: A list of messages for a given group

- Response shape (JSON):

  ```json
  {

    { "messages": [
        {
          "id": int,
          "message": string,
          "created_on": "YYYY-MM-DDTHH:MM:SS",
          "user_id": int,
          "group_id": int,
        }
        ]
    }

  }
  ```

  ### Updated message

- Endpoint path: /groups/{group_id}/messages
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Response: Update a message by message_id

- Response shape (JSON):

  ```json
  {
  "message": string,
  "created_on": "YYYY-MM-DDTHH:MM:SS",
  }
  ```

  ### Delete

- Endpoint path: /messages/{message_id}
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Delete a message by message_id

- Response shape (JSON):

  ```json
  {
    true
  }
  ```

<!----------- GROUPS ----------->
<!-- Veronica -->

### CREATE A GROUP

- Endpoint path: /groups
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
      “group_name”: string,
  }
  ```
- Response: Successfully created group

- Response shape (JSON):
  ```json
      {
          “id”: int,
          “group_name”: string,
          “creator_id”: int
      }
  ```

### GET LIST OF ALL GROUPS

- Endpoint path: /groups
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of all groups

- Response shape (JSON):
  ```json
   {
       “Groups”: [
       {
           “id”: int,
           “group_name”: string,
       }
       ]
   }
  ```

### GET LIST OF GROUPS BY USER

- Endpoint path: /user/{user_id}/groups
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of groups by user

- Response shape (JSON):
  ```json
   {
       “Groups”: [
       {
           “id”: int,
           “group_name”: string,
       }
       ]
   }
  ```

### VIEW GROUP DETAILS

- Endpoint path: /groups/{group_id}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Group details

- Response shape (JSON):
  ```json
  {
      “id”: int,
      “group_name”: string,
  }
  ```

### DELETE GROUP

- Endpoint path: /groups/{group_id}
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Successfully deleted member from group

- Response shape (JSON):
  ```json
      {
          “Message”: “Successfully deleted group”
      }
  ```

<!----------- GROUP MEMBERS ----------->

### GET LIST OF GROUP MEMBERS

- Endpoint path: /groups/{group_id}/group_members    
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Group members

- Response shape (JSON):
  ```json
  {
      "member_id": int,
      "group_id": int,
      "user" : [
        "id": int,
        "user_name": int,
        "email": string,
      ]
  }
  ```

### ADD MEMBER TO GROUP

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
- Response: Successfully added member to group

- Response shape (JSON):
  ```json
  {
    "id": int,
    "group_id": int,
    "user_id": int
  }
  ```

### GET A GROUP MEMBER

- Endpoint path: /group_members/{id}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "id": int
  }
  ```
- Response: Successfully returns a group member

- Response shape (JSON):
  ```json
  {
    "id": int,
    "group_name": str,
    "user_name": str,
    "email": str,
    "user_id": int
  }
  ```

### GET LIST OF ALL GROUP MEMBERS

- Endpoint path: /group_members
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Returns a list of all group members

- Response shape (JSON):
  ```json
  {
    "id": int,
    "group_name": str,
    "user_name": str,
    "email": str,
    "user_id": int
  }
  ```

### GET LIST OF GROUP MEMBERS FOR SPECIFIC GROUP

- Endpoint path: /groups/{group_id}/group_members
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
    "group_id": int
  }
  ```

- Response: Returns a list of all group members in a specific group

- Response shape (JSON):
  ```json
  {
    "id": int,
    "group_name": str,
    "user_name": str,
    "email": str,
    "user_id": int
  }
  ```

### DELETE MEMBER FROM GROUP

- Endpoint path: /group_members/{id}
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  ```json
  {
    "id": int
  }
  ```

- Response: Successfully deleted member from group

- Response shape (JSON):
  ```json
  {
    “Message”: “Successfully deleted friend from group”
  }
  ```

<!----------- EVENTS ----------->

### Create an Event

- Endpoint path: /groups/{group_id}/events
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "title": "string",
    "location": "string",
    "image_url": "string",
    "event_time_date": "2023-10-16T18:36:32.681Z",
    "description": "string"
  }
  ```
- Response: JSON Message indicating successfull event creation

- Response shape (JSON):
  ```json
  {
    "string"
  }
  ```

### Update an Event

- Endpoint path: /events/{event_id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "title": "string",
    "location": "string",
    "image_url": "string",
    "event_time_date": "2023-10-16T18:38:05.877Z",
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
    "event_time_date": "2023-10-16T18:38:05.878Z",
    "description": "string",
    "group_id": "int",
    "creator_id": "int"
  }
  ```

### Delete an Event

- Endpoint path: /events/{event_id}
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Confirmation that selected event has been deleted

- Response shape (JSON):
  ```json
  true
  ```

### Get Detail of Event

- Endpoint path: /events/{event_id}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Details of selected event

- Response shape (JSON):
  ```json
  {
    "id": "int",
    "title": "string",
    "location": "string",
    "image_url": "string",
    "event_time_date": "2023-10-16T18:39:45.228Z",
    "description": "string",
    "group_id": "int",
    "creator_id": "int"
  }
  ```

### Get List of Events for a Group

- Endpoint path: /groups/{group_id}/events
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of events associated with a specific group

- Response shape (JSON):
  ```json
  [
    {
      "id": "int",
      "title": "string",
      "location": "string",
      "image_url": "string",
      "event_time_date": "2023-10-16T17:43:02.283000",
      "description": "string",
      "group_id": "int",
      "creator_id": "int"
    },
    ...
  ]
  ```

### Get List of Events for a Specific User

- Endpoint path: /users/{user_id}/events
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of events associated with a specific User

- Response shape (JSON):
  ```json
  [
    {
      "id": "int",
      "title": "Event 1 (updated)",
      "location": "string",
      "image_url": "string",
      "event_time_date": "2023-10-16T17:43:02.283000",
      "description": "string",
      "group_id": "int",
      "creator_id": "int",
      "status": "string"
    },
    ...
  ]
  ```

<!----------- EVENT ATTENDANCE ----------->

### Get List of Attendees for an Event

- Endpoint path: /events/{event_id}/attendees
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Returned JSON that has a list of event attendents with the users name, ordered by their status, i.e. "going" vs "not going" vs "not seen"

- Response shape (JSON):
  ```json
  [
    {
      "id": "int",
      "status": "string",
      "user_id": "int",
      "event_id": "int",
      "user_name": "string"
    }, ...
  ]
  ```

### Get List of all Attendees

- Endpoint path: /attendees
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Returned JSON that has a list of event attendents

- Response shape (JSON):
  ```json
  [
    {
      "id": "int",
      "status": "string",
      "user_id": "int",
      "event_id": "int",
      "user_name": "string"
    }, ...
  ]
  ```

### Create an Attendance

- Endpoint path: /attendees
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "event_id": "int"
  }
  ```
- Response: Returned JSON that has information for specific event with: event and user ids, and a default user event status that is "Not Seen"

- Response shape (JSON):
  ```json
  {
    "id": "int",
    "status": "Not Seen",
    "user_id": "int",
    "event_id": "int"
  }
  ```

### Update an Event Attendance

- Endpoint path: /attendees/{attendee_id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "status": "Going/Not Going/Maybe"
  }
  ```
- Response: Updated event attendance detail with changed status information reflected

- Response shape (JSON):
  ```json
  {
    "id": "int",
    "status": "string",
    "user_id": "int",
    "event_id": "int"
  }
  ```

<!-- PATRICK  - Movies, ratings, “want to see”  -->

<!-- MOVIES -->

### Create a New Movie in a Group

- Endpoint path: /groups/{group_id}/movies/
- Endpoint method: POST
- Headers:
  - Authorization: Bearer token
- Request shape (JSON):
  ```json
  {
    "title": "string",
    "image_url": "string",
    "description": "string",
    "release_date": "YYYY-MM-DD"
  }
  ```
- Response: Movie successfully created
- Response shape (JSON):
  ```json
  {
    "movie_id": "int",
    "group_id": "int",
    "title": "string",
    "image_url": "string",
    "description": "string",
    "release_date": "YYYY-MM-DD",
    "created_on": "YYYY-MM-DDTHH:MM:SS"
  }
  ```

### Delete a Movie in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}
- Endpoint method: DELETE
- Headers:
  - Authorization: Bearer token
- Response: Movie successfully deleted
- Response shape (JSON):
  ```json
  {
    "message": "Movie deleted successfully"
  }
  ```

### Update Movie Details in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}
- Endpoint method: PUT
- Headers:
  - Authorization: Bearer token
- Request shape (JSON):
  ```json
  {
    "title": "string",
    "image_url": "string",
    "description": "string",
    "release_date": "YYYY-MM-DD"
  }
  ```
- Response: Movie successfully updated
- Response shape (JSON):
  ```json
  {
    "movie_id": "int",
    "group_id": "int",
    "title": "string",
    "image_url": "string",
    "description": "string",
    "release_date": "YYYY-MM-DD",
    "created_on": "YYYY-MM-DDTHH:MM:SS"
  }
  ```

### Get List of All Movies in a Group

- Endpoint path: /groups/{group_id}/movies
- Endpoint method: GET
- Query parameters:
  - title: the title of the Movie to search for
- Headers:
  - Authorization: Bearer token
- Response: List of all movies in the group
- Response shape (JSON):
  ```json
  {
      "movies": [
          {
              "movie_id": "int",
              "group_id": "int",
              "title": "string",
              "image_url": "string",
              "description": "string",
              "release_date": "YYYY-MM-DD",
              "created_on": "YYYY-MM-DDTHH:MM:SS"
          },
          ...
      ]
  }
  ```

### Search Movies in a Group

- Endpoint path: /groups/{group_id}/movies/search
- Endpoint method: GET
- Query parameters:
- title: search term
- Headers:
- Authorization: Bearer token
- Response shape (JSON):
  ```json
  {
    "movies": [
      {
          "movie_id": "int",
          "group_id": "int",
          "title": "string",
          "image_url": "string",
          "description": "string",
          "release_date": "YYYY-MM-DD",
          "created_on": "YYYY-MM-DDTHH:MM:SS"
      },
      ...
      ]
  }
  ```

### Get Details of a Specific Movie in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: Details of the movie
- Response shape (JSON):
  ```json
  {
    "movie_id": "int",
    "group_id": "int",
    "title": "string",
    "image_url": "string",
    "description": "string",
    "release_date": "YYYY-MM-DD",
    "created_on": "YYYY-MM-DDTHH:MM:SS"
  }
  ```

<!-- RATINGS -->

### Create a Rating for a Movie in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}/ratings
- Endpoint method: POST
- Headers:
  - Authorization: Bearer token
- Request shape (JSON):
  ```json
  {
    "rating": "int"
  }
  ```
- Response: Rating successfully created
- Response shape (JSON):
  ```json
  {
    "id": "int",
    "group_id": "int",
    "movie_id": "int",
    "user_id": "int",
    "rating": "int"
  }
  ```

### Update a Rating for a Movie in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}/ratings/{rating_id}
- Endpoint method: PUT
- Headers:
  - Authorization: Bearer token
- Request shape (JSON):
  ```json
  {
    "rating": "int"
  }
  ```
- Response: Rating successfully updated
- Response shape (JSON):
  ```json
  {
    "id": "int",
    "group_id": "int",
    "movie_id": "int",
    "user_id": "int",
    "rating": "int"
  }
  ```

### Get List of Ratings for a Movie in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}/ratings
- Endpoint method: GET
- Headers:
  - Authorization: Bearer token
- Response: List of all ratings for the movie in the specified group.
- Response shape (JSON):
  ```json
  {
      "ratings": [
          {
              "id": "int",
              "group_id": "int",
              "movie_id": "int",
              "user_id": "int",
              "rating": "int"
          },
          ...
          ]
  }
  ```

### Get the Average Rating of a Movie in a Group

- Endpoint path: /groups/{group_id}/movies/{movie_id}/averageRating
- Endpoint method: GET
- Headers:
- Authorization: Bearer token
- Response shape (JSON):
  ```json
  {
    "average_rating": "float"
  }
  ```

<!-- WANT TO SEE -->

### Add/remove user to/from the a “Want to See” list

- Endpoint path: /groups/{group_id}/movies/{movie_id}/togglewantToSee
- Endpoint method: POST
- Headers:
  - Authorization: Bearer token
- Response: Successfully updated the "Want to See" list
- Response shape (JSON):
  ```json
  {
      "id": "int",
      "movie_id": "int",
      "group_id": "int",
      "users_want_to_see": ["int", ...]
  }
  ```
