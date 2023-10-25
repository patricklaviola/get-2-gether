import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

function GroupForm() {
  const [group_name, setGroupName] = useState('');
  const [creator_id, setCreatorID] = useState('');
  const { token } = useToken();

  useEffect(() => {
    if (token && token.account) {
      setCreatorID(token.account.id);
    }
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      group_name: group_name,
      creator_id: creator_id,
    };

    const groupUrl = `${process.env.REACT_APP_API_HOST}/groups/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    };

    const response = await fetch(groupUrl, fetchConfig);
    if (response.ok) {
      setGroupName('');
    }
  }

  function handleChangeGroupName(event) {
    const { value } = event.target;
    setGroupName(value);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#Modal"
      >
        Create New Group
      </button>
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
                className="btn-close"
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
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupForm;
