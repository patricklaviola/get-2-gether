import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function SideMenu(props) {
  const [token, setToken] = useState({});
  const [groups, setGroups] = useState([]);

  async function getToken() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      setToken(data["account"]);
    }
  }

  const fetchData = async () => {
    if (token && token.id) {
      const groupsUrl = `${process.env.REACT_APP_API_HOST}/users/${token.id}/groups`;

      const groupsResponse = await fetch(groupsUrl, {
        credentials: "include",
      });
      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, groups]);

  const handleGroupMemberDelete = async (id) => {
    const url = `${process.env.REACT_APP_API_HOST}/group_members/${id}`;
    const fetchConfig = {
      method: "delete",
      credentials: "include",
    };
    const response2 = await fetch(url, fetchConfig);
    if (response2.ok) {
      const finished = await response2.json();
      if (finished) {
        props.fetchGroupMembers();
      }
      const eventsUrl = `${process.env.REACT_APP_API_HOST}/groups/${props.group.id}/events`;
      const response3 = await fetch(eventsUrl, { credentials: "include" });
      if (response3.ok) {
        for (let i = 0; i < response3.length; i++) {
          let e = response3[i];
          const deleteAttendeeUrl = `${process.env.REACT_APP_API_HOST}/users/${token.id}/event/${e.id}/attendees`;
          const fetch2Config = {
            method: "delete",
            credentials: "include",
          };
          const response4 = await fetch(deleteAttendeeUrl, fetch2Config);
          if (response4.ok) {
          }
        }
      }
    }
  };

  return (
    <>
      <button
        className="btn btn-link submit-login submit-container position-fixed top-0 start-0 m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Menu
      </button>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <button
            className="btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseGroups"
          >
            My Groups
          </button>
          <div className="collapse" id="collapseGroups">
            <ul className="list-group list-group-flush">
              {groups.map((group) => {
                return (
                  <li key={`g-${group.id}`} className="list-group-item">
                    <Link to={`/groups/${group.id}`}>{group.group_name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <hr className="dropdown-divider" />
          {props.friends ? (
            <>
              <button
                className="btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFriends"
              >
                My Friends
              </button>
              <div className="collapse" id="collapseFriends">
                <ul className="list-group list-group-flush">
                  {props.friends.map((friend) => {
                    return (
                      <li key={friend.user_name} className="list-group-item">
                        {friend.user_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : (
            <>
              <button
                className="btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMembers"
              >
                Other Group Members
              </button>
              <div className="collapse" id="collapseMembers">
                <ul className="list-group list-group-flush">
                  {props.groupMembers.map((member) => {
                    if (member.user_id === props.userInfo.id) {
                      return null;
                    }
                    if (member.user_id === props.group.creator_id) {
                      return (
                        <li key={member.id} className="list-group-item">
                          {member.user_name} --- Group Admin
                        </li>
                      );
                    }
                    if (props.userInfo.id === props.group.creator_id) {
                      return (
                        <li key={member.id} className="list-group-item">
                          {member.user_name}
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => handleGroupMemberDelete(member.id)}
                            aria-label="Close"
                          ></button>
                        </li>
                      );
                    } else {
                      return (
                        <li key={member.id} className="list-group-item">
                          {member.user_name}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
