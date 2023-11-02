from fastapi import (
    APIRouter,
    Depends,
    Response,
    WebSocket,
    WebSocketDisconnect,
)
from authenticator import authenticator
from typing import List, Union
import json
from datetime import datetime, timezone


from queries.groups.messages import (
    MessageRepository,
    MessageOut,
    MessageIn,
    Error,
    MessageUpdateOut,
)


router = APIRouter(tags=["Messages"])


@router.post(
    "/groups/{group_id}/messages", response_model=Union[MessageOut, Error]
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
    "/messages/{message_id}", response_model=Union[MessageUpdateOut, Error]
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
    response_model=Union[List[MessageOut], Error],
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


def timestamp():  # Function to get the current timestamp
    return datetime.now(timezone.utc).isoformat()


class ConnectionManager:  # Class to manage WebSocket connections
    def __init__(self):
        self.active_connections: List[
            WebSocket
        ] = []  # List to hold active WebSocket connections
        self.current_message_id = 0  # Counter for message IDs

    async def connect(
        self,
        websocket: WebSocket,
        client_id: int,
    ):  # Asynchronous method to handle connection
        await websocket.accept()  # Accept the WebSocket connection
        self.active_connections.append(
            websocket
        )  # Append the WebSocket to the list of active connections

    def disconnect(
        self, websocket: WebSocket
    ):  # Method to handle disconnection
        self.active_connections.remove(
            websocket
        )  # Remove the WebSocket from the list of active connections

    async def send_personal_message(
        self,
        message: str,
        client_id: int,
        websocket: WebSocket,
    ):  # Asynchronous method to send a personal message
        payload = json.dumps(
            {
                "client_id": client_id,
                "content": message,
                "timestamp": timestamp(),
                "message_id": self.next_message_id(),
            }
        )  # Creating a JSON payload for the message
        await websocket.send_text(payload)  # Sending the message as text

    async def broadcast(
        self, message: str, client_id: int
    ):  # Asynchronous method to broadcast a message
        payload = json.dumps(
            {
                "client_id": client_id,
                "content": message,
                "timestamp": timestamp(),
                "message_id": self.next_message_id(),
            }
        )  # Creating a JSON payload for the message
        print(
            "active connections:", len(self.active_connections)
        )  # Print the number of active connections
        for (
            connection
        ) in self.active_connections:  # Loop over all active connections
            await connection.send_text(
                payload
            )  # Send the message to each active connection

    def next_message_id(self):  # Method to get the next message ID
        self.current_message_id += 1  # Increment the message ID
        return self.current_message_id  # Return the new message ID


manager = ConnectionManager()  # Instantiate the ConnectionManager class


@router.websocket("/chat/{client_id}")  # WebSocket route
async def websocket_endpoint(
    websocket: WebSocket,
    client_id: int,
):  # Asynchronous function for WebSocket handling
    await manager.connect(
        websocket, client_id
    )  # Connect the WebSocket and assign a client ID
    try:
        while True:  # Keep listening for messages
            message = (
                await websocket.receive_text()
            )  # Receive a message from the client
            await manager.broadcast(
                message, client_id
            )  # Broadcast the received message
    except WebSocketDisconnect:  # Handle WebSocket disconnection
        manager.disconnect(websocket)  # Disconnect the WebSocket
        await manager.broadcast(
            "Disconnected", client_id
        )  # Broadcast that the client has disconnected
