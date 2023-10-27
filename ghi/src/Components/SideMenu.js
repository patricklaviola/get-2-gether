import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function SideMenu(props) {
  const [token, setToken] = useState({});
  const [groups, setGroups] = useState([]);

  async function getToken() {
    try {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, { credentials: "include" });

      if (response.ok) {
        const data = await response.json();
        setToken(data["account"]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async () => {
    if (token && token.id) {
      try {
        const groupsUrl = `${process.env.REACT_APP_API_HOST}/users/${token.id}/groups`;

        const groupsResponse = await fetch(groupsUrl, {
          credentials: "include",
        });
        if (groupsResponse.ok) {
          const groupsData = await groupsResponse.json();
          setGroups(groupsData);
        }
      } catch (error) {
        console.error(error);
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
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <button
          className="btn menu-button"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          Menu
        </button>
      </div>
      <div>
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
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <button
              className="btn canvas-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseGroups"
            >
              My Groups
            </button>
            <div className="collapse" id="collapseGroups">
              <ul className="list-group list-group-flush member">
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
                  className="btn canvas-button"
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
                        <li
                          key={friend.user_name}
                          className=" member list-group-item"
                        >
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
                  className="btn canvas-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseMembers"
                >
                  Other Group Members
                </button>
                <div className="collapse" id="collapseMembers">
                  <ul className="list-group list-group-flush member">
                    {props.groupMembers.map((member) => {
                      if (member.user_id === props.userInfo.id) {
                        return null;
                      }
                      if (member.user_id === props.group.creator_id) {
                        return (
                          <li
                            key={member.id}
                            className="list-group-item  member"
                          >
                            {member.user_name} --- Group Admin
                          </li>
                        );
                      }
                      if (props.userInfo.id === props.group.creator_id) {
                        return (
                          <li
                            key={member.id}
                            className="list-group-item member"
                          >
                            {member.user_name}
                            <div style={{ float: "right" }}>
                              <button
                                type="button"
                                className="colorCorrect"
                                onClick={() =>
                                  handleGroupMemberDelete(member.id)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="15"
                                  viewBox="0 -960 960 960"
                                  width="20"
                                >
                                  <path
                                    fill="red"
                                    d="M481-83Q347-218 267.5-301t-121-138q-41.5-55-54-94T80-620q0-92 64-156t156-64q45 0 87 16.5t75 47.5l-62 216h120l-34 335 114-375H480l71-212q25-14 52.5-21t56.5-7q92 0 156 64t64 156q0 48-13 88t-55 95.5q-42 55.5-121 138T481-83Zm-71-186 21-211H294l75-263q-16-8-33.5-12.5T300-760q-58 0-99 41t-41 99q0 31 11.5 62t40 70.5q28.5 39.5 77 92T410-269Zm188-48q111-113 156.5-180T800-620q0-58-41-99t-99-41q-11 0-22 1.5t-22 5.5l-24 73h116L598-317Zm110-363ZM294-480Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li
                            key={member.id}
                            className="list-group-item member"
                          >
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
      </div>
    </>
  );
}

export default SideMenu;
