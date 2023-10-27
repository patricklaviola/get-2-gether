from queries.groups.groups import GroupRepository, GroupOut, GroupIn, Error
from fastapi import APIRouter, Depends
from authenticator import authenticator
from typing import List, Union

router = APIRouter(tags=["Groups"])


@router.post("/groups")
def create_group(
    group: GroupIn,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    creator_id = account_data["id"]
    return repo.create(group, creator_id)


@router.get("/groups/{group_id}", response_model=GroupOut)
def get_group(
    group_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> GroupOut:
    return repo.get(group_id)


@router.delete("/groups/{group_id}", response_model=bool)
def delete_group(
    group_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(group_id)


@router.get("/groups", response_model=Union[Error, List[GroupOut]])
def get_all_groups(
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.list_groups()


@router.get(
    "/users/{user_id}/groups", response_model=Union[Error, List[GroupOut]]
)
def get_groups_by_user(
    user_id: int,
    repo: GroupRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_groups_by_user(user_id)
