import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import accounts
from routers.groups import groups, group_members, messages
from routers.events import events, event_attendees


app = FastAPI()

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(groups.router)
app.include_router(event_attendees.router)
app.include_router(events.router)
app.include_router(messages.router)
app.include_router(group_members.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
