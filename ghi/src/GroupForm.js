import React, { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';

function GroupForm() {
    const [group_name, setGroupName] = useState('');
    const [creator_id, setCreatorID] = useState('');
    const { token } = useToken();
    const navigate = useNavigate();

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
        }

        const groupUrl = `${process.env.REACT_APP_API_HOST}/groups/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        }

        const response = await fetch(groupUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            setGroupName('');
        }
        navigate("/")
    }

    function handleChangeGroupName(event) {
        const { value } = event.target;
        setGroupName(value);
    }

    return  (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Group</h1>
                    <form onSubmit={handleSubmit} id="create-group-form">
                        <div className="form-floating mb-3">
                            <input value={group_name} onChange={handleChangeGroupName} placeholder="Group Name" required type="text" name="group_name" id="group_name" className="form-control" />
                            <label htmlFor="group_name">Group Name</label>
                        </div>
                        <button className="btn btn-primary">Create Group</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GroupForm;
