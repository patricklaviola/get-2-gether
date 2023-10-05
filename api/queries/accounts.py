import os  # Imports the standard library 'os' module to interact with the operating system.
from psycopg_pool import ConnectionPool  # Imports the 'ConnectionPool' class from the 'psycopg_pool' module.
from pydantic import BaseModel  # Imports the 'BaseModel' class from the 'pydantic' library.
# from queries.pool import pool  # This line is commented out and does nothing; it seems to be importing another 'pool'.
# from typing import Optional, List, Union  # Imports type annotations 'Optional', 'List', and 'Union' from the 'typing' module.
pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))  # Initializes a connection pool using the DATABASE_URL from environment variables.


class Error(BaseModel):  # Defines a 'Error' class which inherits from 'BaseModel'.
    message: str  # Defines a single attribute 'message' which should be of type 'str'.


class DuplicateAccountError(ValueError):  # Defines a custom exception class 'DuplicateAccountError' which inherits from 'ValueError'.
    pass  # Placeholder indicating there's no additional code for this class.


class AccountIn(BaseModel):  # Defines an 'AccountIn' class to represent incoming account data.
    full_name: str  # Account full_name of type 'str'.
    email: str  # Account email of type 'str'.
    password: str  # Account password of type 'str'.


class AccountOut(BaseModel):  # Defines an 'AccountOut' class to represent outgoing account data without password.
    id: int  # User ID of type 'int'.
    full_name: str  # Account full_name of type 'str'.
    email: str  # Account email of type 'str'.


class AccountOutWithPassword(AccountOut):  # Defines a class that extends 'AccountOut' but also includes the hashed password.
    hashed_password: str  # Hashed password of type 'str'.


class AccountRepo:  # Defines a repository class 'AccountRepo' for account-related operations.
    def record_to_account_out(self, record) -> AccountOutWithPassword:  # Method to convert a database record to an 'AccountOutWithPassword' object.
        account_dict = {  # Constructs a dictionary from the database record.
            "id": record[0],  # The first element from the record is assumed to be 'id'.
            "full_name": record[1],  # The second element is 'full_name'.
            "email": record[2],  # The third element is 'email'.
            "hashed_password": record[3]  # The fourth element is 'hashed_password'.
        }
        return account_dict  # Returns the constructed dictionary.

    def create(self, user: AccountIn, hashed_password: str) -> AccountOutWithPassword:  # Method to create a new user in the database.
        try:  # Tries the following block of code.
            print("USER",user)  # Debug print for the user input.
            print("HASHED",hashed_password)  # Debug print for the hashed password.
            with pool.connection() as conn:  # Gets a connection from the connection pool.
                with conn.cursor() as db:  # Gets a database cursor.
                    # Executes an SQL insert statement and returns the new user's details.
                    result = db.execute(
                        """
                        INSERT INTO users
                            (full_name, email, hashed_password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING
                        id, full_name, email, hashed_password;
                        """,
                        [
                            user.full_name,  # Uses the 'full_name' from the user input.
                            user.email,  # Uses the 'email' from the user input.
                            hashed_password,  # Uses the provided hashed password.
                        ]
                    )
                    print("insert worked?")  # Debug print to check if insertion worked.
                    id = result.fetchone()[0]  # Fetches the inserted user's ID.
                    print("ID GOTTEN",id)  # Debug print for the fetched user ID.
                    # Returns an 'AccountOutWithPassword' object with the inserted user's details.
                    return AccountOutWithPassword(
                        id=id,
                        full_name=user.full_name,
                        email=user.email,
                        hashed_password=hashed_password,
                    )
        except Exception:  # Catches any exceptions.
            return {"message": "Could not create a user"}  # Returns an error message if any exception occurs.

    def get(self, email: str) -> AccountOutWithPassword:  # Method to get a user from the database by their email.
        try:  # Tries the following block of code.
            print("is trying get somehow?")  # Debug print for entering the method.
            print("email",email)  # Debug print for the provided email.
            with pool.connection() as conn:  # Gets a connection from the connection pool.
                with conn.cursor() as db:  # Gets a database cursor.
                    # Executes an SQL select statement to fetch the user by their email.
                    result = db.execute(
                        """
                        SELECT
                        id, full_name, email, hashed_password
                        FROM users
                        WHERE email = %s
                        """,
                        [email],  # Uses the provided email for the where clause.
                    )
                    record = result.fetchone()  # Fetches the returned record.
                    print("record found",record)  # Debug print for the fetched record.
                    if record is None:  # Checks if no record was returned.
                        return None  # Returns 'None' if no record was found.
                    return self.record_to_account_out(record)  # Converts the record to an 'AccountOutWithPassword' object and returns it.
        except Exception:  # Catches any exceptions.
            return {"message": "Could not get account"}  # Returns an error message if any exception occurs.

    pass  # Placeholder indicating there's no additional code for this class.
