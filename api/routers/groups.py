from fastapi import Depends, APIRouter
from queries.groups import GroupRepository, GroupOut, GroupIn, GroupOutMembers


router = APIRouter()


@router.post("/groups")
def create_group(
    group: GroupIn,
    repo: GroupRepository = Depends()
    ):
    return repo.create(group)


@router.get("/groups/{group_id}/", response_model=GroupOutMembers)
def get_group(
    group_id: int,
    repo: GroupRepository = Depends(),
) -> GroupOutMembers:
    return repo.get(group_id)
