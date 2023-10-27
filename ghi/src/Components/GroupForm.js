import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GroupForm() {
  const [group_name, setGroupName] = useState("");
  const navigate = useNavigate();
  const [creatorId, setCreatorID] = useState("");
  const [token, setToken] = useState("");

  async function getToken() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      setToken(data);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token && token.account) {
      setCreatorID(token.account.id);
    }
  }, [token]);

  async function createGroup(data) {
    const groupUrl = `${process.env.REACT_APP_API_HOST}/groups`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(groupUrl, fetchConfig);

    if (response.ok) {
      const createdGroup = await response.json();

      if (createdGroup && createdGroup.id) {
        return createdGroup;
      } else {
        throw new Error("Group id not found");
      }
    } else {
      throw new Error("Failed to create new group");
    }
  }

  async function createGroupMember(createdGroup) {
    const groupMembersUrl = `${process.env.REACT_APP_API_HOST}/group_members`;
    const data = {
      group_id: createdGroup.id,
      user_id: creatorId,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    const response = await fetch(groupMembersUrl, fetchConfig);

    if (!response.ok) {
      console.error("Failed to create group member");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const groupData = {
        group_name: group_name,
      };

      const createdGroup = await createGroup(groupData);

      if (createdGroup) {
        await createGroupMember(createdGroup);
        setGroupName("");
        navigate("/personal-dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChangeGroupName(event) {
    const { value } = event.target;
    setGroupName(value);
  }

  return (
    <>
      <div id="create-group-button">
        <button
          type="button"
          className="btn groupForm"
          data-bs-toggle="modal"
          data-bs-target="#Modal"
          
        >
          Create New Group
        </button>
      </div>
      <div>
        <div
          className="modal fade"
          id="Modal"
          tabIndex="-1"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ModalLabel">
                  Create Group
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit} id="create-group-form">
                <div className="modal-body">
                  <input
                    value={group_name}
                    onChange={handleChangeGroupName}
                    placeholder="Group Name"
                    required
                    type="text"
                    name="group_name"
                    id="group_name"
                    className="form-control"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn submit-create"
                    data-bs-dismiss="modal"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupForm;
