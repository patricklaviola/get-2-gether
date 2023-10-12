import os  # Imports the standard library 'os' module to interact with the operating system.
from fastapi import Depends  # Imports 'Depends' from FastAPI, a dependency injection system.
from jwtdown_fastapi.authentication import Authenticator  # Imports the 'Authenticator' class from 'jwtdown_fastapi.authentication' module.
from queries.accounts import AccountRepo, AccountOutWithPassword  # Imports several classes from the 'queries.accounts' module.


class ExampleAuthenticator(Authenticator):  # Defines a new class 'ExampleAuthenticator' that inherits from 'Authenticator'.
    async def get_account_data(
        self,
        email: str,
        accounts: AccountRepo,
    ):
        # This method is asynchronous. It fetches account data based on the provided email.
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(email)  # Calls the 'get' method of 'AccountRepo' to fetch the account by email.

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        # This method returns an account getter. It has a dependency on 'AccountRepo'.
        # Return the accounts. That's it.
        return accounts  # Simply returns the provided 'accounts' (i.e., 'AccountRepo' instance).

    def get_hashed_password(self, account: AccountOutWithPassword):
        # This method returns the hashed password of a given account.
        # Return the encrypted password value from your account object
        return account.__getitem__('hashed_password')  # Gets the 'hashed_password' attribute from the 'account' and returns it.

    def get_account_data_for_cookie(self, account: AccountOutWithPassword):
        # This method prepares and returns data to be stored in a cookie.
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        d = account['user_name']  # Gets the 'user_name' attribute from the 'account' and assigns it to 'd'.
        return d, AccountOutWithPassword(**account)  # Returns two values: 'd' (user_name of the account) and an 'AccountOutWithPassword' object created from the account's dictionary representation.


# Instantiates 'ExampleAuthenticator' with the 'SIGNING_KEY' from environment variables.
authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
