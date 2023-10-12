from queries.groups import GroupRepository, GroupOut, GroupIn, Error
from fastapi import APIRouter, Depends
# from authenticator import authenticator
from typing import List, Union

router = APIRouter()


@router.post("/groups")
def create_group(
    group: GroupIn,
    repo: GroupRepository = Depends()
):
    return repo.create(group)


@router.get("/groups/{group_id}/", response_model=GroupOut)
def get_group(
    group_id: int,
    repo: GroupRepository = Depends(),
) -> GroupOut:
    return repo.get(group_id)


@router.delete("/groups/{group_id}", response_model=bool)
def delete_group(
    group_id: int,
    repo: GroupRepository = Depends(),
) -> bool:
    return repo.delete(group_id)


@router.get("/groups", response_model=Union[Error, List[GroupOut]])
def get_all_groups(
    repo: GroupRepository = Depends(),
):
    return repo.list_groups()


@router.get("/user/{user_id}/groups",
            response_model=Union[Error, List[GroupOut]])
def list_groups_by_user():
    pass
