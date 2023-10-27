import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AddGroupMemberForm(props) {
  const { id } = useParams();
  const [user_id, setUserID] = useState("");
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function getUsers() {
    const url = `${process.env.REACT_APP_API_HOST}/accounts`;
    const response = await fetch(url, { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      group_id: id,
      user_id: user_id,
    };

    const groupMembersUrl = `${process.env.REACT_APP_API_HOST}/group_members`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const response = await fetch(groupMembersUrl, fetchConfig);

      if (response.ok) {
        setUserID("");
        setSuccessMessage("User added to the group successfully!");
        props.setChange(!props.change);
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        const responseText = await response.text();
        setErrorMessage(`Error: ${responseText}`);
      }
    } catch (error) {
      setErrorMessage("Error: User is already in the group.");
      setTimeout(() => setErrorMessage(""), 5000);
      setUserID("");
    }
  }

  function handleChangeUserID(event) {
    const { value } = event.target;
    setUserID(value);
  }

  return (
    <>
      <button
        type="button"
        className="btn groupForm"
        data-bs-toggle="modal"
        data-bs-target="#GroupModal"
      >
        Add Group Member
      </button>
      <div
        className="modal fade"
        id="GroupModal"
        tabIndex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel">
                Add Group Member
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit} id="add-group-member-form">
              <div className="modal-body">
                <select
                  value={user_id}
                  onChange={handleChangeUserID}
                  required
                  name="user_id"
                  id="user_id"
                  className="form-select"
                >
                  <option value="">Select User</option>
                  {users &&
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.user_name}
                      </option>
                    ))}
                </select>
              </div>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              {successMessage && (
                <p className="text-success">{successMessage}</p>
              )}
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn create-group-member"
                  data-bs-dismiss="modal"
                >
                  Add to Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddGroupMemberForm;
