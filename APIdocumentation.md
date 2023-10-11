<!-- Nadine: User, Chat, Friends -->
<!-- USER -->

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

<!-- CHAT -->

### Create a message

- Endpoint path: users/{user_id}/groups/{group_id}
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request body:
  ```json
  {
      "text": string,
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
      "success": boolean
  }
  ```

### Display/get list of messages for the group, display in chronological order

- Endpoint path: users/{user_id}/groups/{group_id}
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
              “text”: sting,
              “created_on”: "YYYY-MM-DDTHH:MM:SS",
              “user_id”: int
          }
          ]
      }

  }
  ```

<!-- Veronica - Groups -->

### CREATE A GROUP

- Endpoint path: users/{user_id}/groups
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

### GET LIST OF GROUPS

- Endpoint path: users/{user_id}/groups
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of groups

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

- Endpoint path: users/{user_id}/groups/{group_id}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Group details

- Response shape (JSON):
  ```json
  {
      “id”: int,
      “group_name”: string,
      “group_members”: [
          {
              "user_id": "int",
              "user_name": "string",
          }
      ]
  }
  ```

### ADD MEMBER TO GROUP

- Endpoint path: /groups/{group_id}/
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
       “group_members”: int,
  }
  ```
- Response: Successfully added member to group

- Response shape (JSON):
  ```json
  {
    “id”: int,
  	“group_name”: string,
  	“group_members”: [
          {
              "user_id": "int",
              "user_name": "string",
          }
      ]
  }
  ```

### DELETE MEMBER FROM GROUP

- Endpoint path: /groups/{group_id}/{user_id}
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Successfully deleted member from group

- Response shape (JSON):
  ```json
      {
          “Message”: “Successfully deleted friend from group”
      }
  ```

<!-- ELIZA – EVENTS -->

### Get List of Events for a Group

- Endpoint path: /groups/{group_id}/events
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of events associated with a specific group

- Response shape (JSON):
  ```json
  {
      "events": [
          {
            "id": int,
            "title" : string,
            "location" : string,
            "image_url": url string,
            "event_time_date": "YYYY-MM-DDTHH:MM:SS",
            "description": string,
            "group_id": string,
            "creator_id": int
          },
      ]
  }
  ```

### Get List of Events for a Specific User

- Endpoint path: /users/{user_id}/events
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: List of events associated with a specific User

- Response shape (JSON):
  ```json
  {
      "events": [
          {
            "id": int,
            "title" : string,
            "location" : string,
            "image_url": url string,
            "event_time_date": "YYYY-MM-DDTHH:MM:SS",
            "description": string,
            "group_id": string,
            "creator_id": int
          },
      ]
  }
  ```

### Get Detail of Event

- Endpoint path: /groups/{group_id}/events/{event_id}
- Endpoint method: GET

- Headers:

  - Authorization: Bearer token

- Response: Details of selected event

- Response shape (JSON):
  ```json
  {
    "id": int,
    "title" : string,
    "location" : string,
    "image_url": url string,
    "event_time_date": "YYYY-MM-DDTHH:MM:SS",
    "description": string,
    "group_id": string,
    "creator_id": int,
    "attendees": [
      {
        "user_id": "int",
        "user_name": "string"
      },
      {
        "user_id": "int",
        "user_name": "string"
      }
    ]
  }
  ```

### Create an Event

- Endpoint path: users/{user_id}/groups/{group_id}/events
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "title": "string",
    "location": "string",
    "event_time_date": "YYYY-MM-DDTHH:MM:SS",
    "image_url": "string"
  }
  ```
- Response: JSON Message indicating successfull event creation

- Response shape (JSON):
  ```json
  {
    "message": "Event created successfully"
  }
  ```

### Delete an Event

- Endpoint path: /groups/{group_id}/events/{event_id}
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Confirmation that selected event has been deleted

- Response shape (JSON):
  ```json
  {
    "message": "Event deleted successfully"
  }
  ```

### Update an Event

- Endpoint path: /groups/{group_id}/events/{event_id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "title": "string",
    "location": "string",
    "event_time_date": "YYYY-MM-DDTHH:MM:SS",
    "image_url": "string"
  }
  ```
- Response: Updated event detail with changed information reflected

- Response shape (JSON):
  ```json
  {
    "message": "Event successfully updated"
  }
  ```

<!-- Event Attendance -->

### Create an Attendance

- Endpoint path: /groups/{group_id}/events/{event_id}/status
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "status": "Yes/No/Maybe",
    "user_id": "int"
  }
  ```
- Response: Returned JSON that has information for specific event with: group information, event information, user information, and user event status

- Response shape (JSON):
  ```json
  {
    "user_id": "int",
    "group_id": "string",
    "event_id": "int",
    "status": "string"
  }
  ```

### Update an Event Attendance

- Endpoint path: /groups/{group_id}/events/{event_id}/status
- Endpoint method: PUT/PATCH

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):
  ```json
  {
    "status": "Yes/No/Maybe",
    "user_id": "int"
  }
  ```
- Response: Updated event attendance detail with changed status information reflected

- Response shape (JSON):
  ```json
  {
    "user_id": "int",
    "group_id": "string",
    "event_id": "int",
    "status": "string"
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
