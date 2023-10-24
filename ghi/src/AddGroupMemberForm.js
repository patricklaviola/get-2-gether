import React, { useState, useEffect } from 'react';

function AddGroupMemberForm() {
  const [group_id, setGroupID] = useState('');
  const [user_id, setUserID] = useState('');
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function getToken() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, { credentials: 'include' });

    if (response.ok) {
      const data = await response.json();
      setToken(data);
    }
  }

  async function getGroups() {
    const url = `${process.env.REACT_APP_API_HOST}/groups`;
    const response = await fetch(url, { credentials: 'include' });

    if (response.ok) {
      const data = await response.json();

      if (token && token.account) {
        const filteredGroups = data.filter(group => group.creator_id === token.account.id);
        setGroups(filteredGroups);
        console.log('Filtered Groups:', filteredGroups);
      }
    }
  }

  async function getUsers() {
    const url = `${process.env.REACT_APP_API_HOST}/accounts`;
    const response = await fetch(url, { credentials: 'include' });

    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getUsers();
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      group_id: group_id,
      user_id: user_id,
    };

    const groupMembersUrl = `${process.env.REACT_APP_API_HOST}/group_members/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    try {
      const response = await fetch(groupMembersUrl, fetchConfig);

      if (response.ok) {
        setGroupID('');
        setUserID('');
        setSuccessMessage('User added to the group successfully.');

        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        const responseText = await response.text();
        setErrorMessage(`Error: ${responseText}`);
      }
    } catch (error) {
      setErrorMessage('Error: User is already in the group.');
      setTimeout(() => setErrorMessage(''), 5000);
      setGroupID('');
      setUserID('');
    }
  }

  function handleChangeGroupID(event) {
    const { value } = event.target;
    setGroupID(value);
  }

  function handleChangeUserID(event) {
    const { value } = event.target;
    setUserID(value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Group Member</h1>
          <form onSubmit={handleSubmit} id="create-group-form">
            <div className="mb-3">
              <select
                value={group_id}
                onChange={handleChangeGroupID}
                required
                name="group_id"
                id="group_id"
                className="form-select"
              >
                <option value="">Choose a Group</option>
                {groups && groups.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.group_name}
                  </option>
                ))}
              </select>
              <select
                value={user_id}
                onChange={handleChangeUserID}
                required
                name="user_id"
                id="user_id"
                className="form-select"
              >
                <option value="">Add Member</option>
                {users && users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.user_name}
                  </option>
                ))}
              </select>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            <button className="btn btn-primary">Add to Group</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddGroupMemberForm;
