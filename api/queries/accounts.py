import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel

pool = ConnectionPool(
    conninfo=os.environ.get("DATABASE_URL")
)


class Error(
    BaseModel
):
    message: str


class DuplicateAccountError(
    ValueError
):
    pass


class AccountIn(
    BaseModel
):
    user_name: str
    email: str
    password: str


class AccountOut(
    BaseModel
):
    id: int
    user_name: str
    email: str


class AccountOutWithPassword(
    AccountOut
):
    hashed_password: str


class AccountRepo:
    def record_to_account_out(
        self, record
    ) -> (
        AccountOutWithPassword
    ):
        account_dict = {
            "id": record[0],
            "user_name": record[1],
            "email": record[2],
            "hashed_password": record[3],
        }
        return account_dict

    def create(
        self, user: AccountIn, hashed_password: str
    ) -> (
        AccountOutWithPassword
    ):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (user_name, email, hashed_password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING
                        id, user_name, email, hashed_password;
                        """,
                        [
                            user.user_name,
                            user.email,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[
                        0
                    ]
                    return AccountOutWithPassword(
                        id=id,
                        user_name=user.user_name,
                        email=user.email,
                        hashed_password=hashed_password,
                    )
        except Exception:
            return {
                "message": "Could not create a user"
            }

    def get(
        self, email: str
    ) -> (
        AccountOutWithPassword
    ):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        id, user_name, email, hashed_password
                        FROM users
                        WHERE email = %s
                        """,
                        [
                            email
                        ],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_account_out(
                        record
                    )
        except Exception:
            return {
                "message": "Could not get account"
            }

    pass
