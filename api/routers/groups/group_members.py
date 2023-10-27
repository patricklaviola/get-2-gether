from queries.groups.group_members import (
    GroupMemberIn,
    GroupMemberOut,
    GroupMemberInfoOut,
    FriendOut,
    GroupMemberRepository,
    Error,
)
from fastapi import APIRouter, Depends
from authenticator import authenticator
from typing import List, Union

router = APIRouter(
    tags=["GroupMembers"]
)


@router.post("/group_members", response_model=GroupMemberOut)
def create_group_member(
    group_member: GroupMemberIn,
    repo: GroupMemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["id"]
    return repo.create_group_member(group_member, user_id)


@router.get("/group_members/{id}", response_model=GroupMemberInfoOut)
def get_group_member(
    id: int,
    repo: GroupMemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> GroupMemberInfoOut:
    return repo.get_group_member(id)


@router.get(
    "/groups/{group_id}/group_members", response_model=List[GroupMemberInfoOut]
)
def get_group_members_list_for_group(
    group_id: int,
    repo: GroupMemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_group_members_list_for_group(group_id)


@router.get(
    "/group_members", response_model=Union[Error, List[GroupMemberInfoOut]]
)
def get_all_group_members(
    repo: GroupMemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_group_members()


@router.delete("/group_members/{id}", response_model=bool)
def delete_group_member(
    id: int,
    repo: GroupMemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete_group_member(id)


@router.get(
    "/users/{user_id}/friends",
    response_model=Union[Error, List[FriendOut]],
)
def get_friends_by_user(
    user_id: int,
    repo: GroupMemberRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_friends_by_user(user_id)
