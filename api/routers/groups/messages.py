from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import List, Union
from queries.groups.messages import(
MessageRepository,
MessageOut,
MessageIn, Error,
MessageUpdateOut
)


router = APIRouter()


@router.post(
        "/groups/{group_id}/messages",
        response_model=Union[MessageOut, Error]
        )
def create_message(
    group_id: int,
    message: MessageIn,
    response: Response,
    repo: MessageRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["id"]
    return repo.create(message, user_id, group_id)


@router.put(
        "/messages/{message_id}",
        response_model=Union[MessageUpdateOut, Error]
        )
def update_message(
    message_id: int,
    message: MessageIn,
    repo: MessageRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[MessageOut, Error]:
    return repo.update(message_id, message)


@router.get(
        "/groups/{group_id}/messages",
        response_model=Union[List[MessageOut], Error]
        )
def get_messages_by_group_id(
    group_id: int,
    response: Response,
    repo: MessageRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get(group_id)


@router.delete("/messages/{message_id}", response_model=bool)
def delete_message(
    message_id: int,
    repo: MessageRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(message_id)
