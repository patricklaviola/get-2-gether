steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id INT PRIMARY KEY NOT NULL,
            full_name VARCHAR(250) NOT NULL,
            email VARCHAR(250) NOT NULL,
            hashed_password VARCHAR(250) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE groups (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(250) NOT NULL,
            user_id INT NOT NULL REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE groups;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE group_members (
            id INT PRIMARY KEY NOT NULL,
            group_id INT NOT NULL REFERENCES groups(id),
            user_id INT NOT NULL REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE group_members;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id INT PRIMARY KEY NOT NULL,
            title VARCHAR(250) NOT NULL,
            location VARCHAR(250) NOT NULL,
            image_url VARCHAR(250),
            description TEXT NOT NULL,
            group_id INT NOT NULL REFERENCES groups(id),
            user_id INT NOT NULL REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE event_attendees (
            id INT PRIMARY KEY NOT NULL,
            status TEXT NOT NULL,
            user_id INT NOT NULL REFERENCES users(id),
            event_id INT NOT NULL REFERENCES events(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE event_attendees;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE messages (
            id INT PRIMARY KEY NOT NULL,
            message TEXT NOT NULL,
            created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            user_id INT NOT NULL REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE messages;
        """
    ]
]
