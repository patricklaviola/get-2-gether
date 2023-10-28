# Get2gether

- Patrick La Viola
- Eliza Ackroyd
- Nadine Castillo
- Veronica Anaya

Get2gether – Your Ultimate All-in-One Solution for Effortless Event Planning and Unforgettable Hangouts!


## Design

Get2gether is a comprehensive application comprising a FastAPI backend, a PostgreSQL database, and a React frontend enhanced with Bootstrap CSS. The system utilizes RESTful APIs for seamless communication. Docker is used to facilitate local development and deployment, with GitLab serving as the deployment platform.

- [API Documentation](docs/APIdocumentation.md)
- [Database Diagram](databasediagram.png)
- [GHI](docs/ghi.md)

## Description

Get2gether is a user-friendly web application designed to simplify event planning and social gatherings, alleviating the stress that often accompanies these tasks. Upon visiting the platform, users are seamlessly directed to a signup or login page. Registering is a breeze, requiring only a name, email, and password. Once logged in, users are led to their personal dashboard.

Within the personal dashboard, a plethora of functionalities awaits. Users can effortlessly view all the groups they're part of, their friends, and the events associated with their groups. Creating a new group is a cinch, and it promptly appears in the menu dropdown on the left under "My Groups". Users can then access the group dashboard with a simple click.

In the group dashboard, users can easily add members to their group by clicking the "Add Group Member" button. A modal window with a user-friendly form provides a dropdown for selecting additional members. When a new member is added to a group, they automatically become friends with the existing group members. Removing a group member is just as straightforward; it can be accomplished by accessing the menu on the left, navigating to "Other Group Members," and clicking the broken heart icon next to the member's name. However, only the group admin has access to this feature.

Furthermore, users have the capability to create events for their groups by clicking the "Create Event" button. This action triggers a modal with a user-friendly event creation form. Once the event details are filled in, an event card is generated on the group dashboard and is also visible in the personal dashboard. The event card provides the option to respond to the event with "Going," "Maybe," or "Not Going." Clicking on the event card opens another modal displaying comprehensive event details, including the address, attendees list and response statuses for each attendee.

Our application also boasts a built-in group chat feature directly within the group dashboard, allowing users to instantly communicate with friends and make plans more effortlessly than ever before.


## Project URLs

##### Frontend deployment URL:

https://cappuccino-coders.gitlab.io/get-2-gether

##### Gitlab project URL:

https://gitlab.com/cappuccino-coders/get-2-gether


## How to Run Get2gether

Follow these steps to set up and run the Get2gether project on your local machine:

1. Clone the Repository:

    In your preferred terminal and desired directory, use the following command to clone the GitLab repository:

    ```
    git clone https://gitlab.com/cappuccino-coders/get-2-gether
    ```

2. Navigate to the Project Directory:

    Change your working directory to the project folder:

    ```
    cd get-2-gether
    ```

3. Set Up Docker:

    Ensure that Docker is installed and running on your system. Create the necessary Docker volumes by running the following commands:

    ```
    docker volume create postgres-data
    docker volume create pg-admin
    ```

    This will prepare the Docker database for use.

4. Build and Run the Docker Containers:

    Execute the following commands to build and start the Docker containers and images:

    ```
    docker compose build
    docker compose up
    ```
    This will launch the Get2gether application.

5. Access the Backend Endpoints:

    Once the Docker containers are up and running, open your web browser and go to http://localhost:8000/docs to explore all the RESTful backend endpoints.

6. Interact with the Application:

    To interact with the Get2gether application, open your web browser and visit http://localhost:3000/login.

## Future Plans for Get2gether
While Get2gether is already a robust platform for event planning and social gatherings, our team has an ambitious vision for its future development. We are committed to continually improving the user experience and expanding on features and functionalities set to better meet the needs of our users. Here are some of the exciting future plans for the Get2gether application:

1. **Modern and User-Friendly Styling**

    We are dedicated to improving the visual appeal of Get2gether. Our future plans include adding more modern and user-friendly styling to the application, ensuring that users enjoy an aesthetically pleasing and intuitive interface.

2. **User Interests and Recommendations**

    We want to create a more personalized experience by implementing features that allow group members to share their interests, such as movies or restaurants. This will enable users to discover and plan events that align with their group members' preferences, enhancing the overall event planning experience.

3. **Enhanced Event Management**

    We aim to introduce advanced event management features, including recurring events, event reminders, and app notifications. These enhancements will make it even easier for users to organize and keep track of their social gatherings.

These future plans represent our dedication to providing an exceptional event planning and social gathering platform. Stay tuned for exciting updates and improvements as we work to make your event planning experience even more enjoyable and efficient.
