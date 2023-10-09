from fastapi import APIRouter, Depends
from queries.groups import GroupIn, GroupRepository

router = APIRouter()

@router.post("/groups")
def create_group(
    group: GroupIn,
    repo: GroupRepository = Depends()
    ):
    return repo.create(group)
