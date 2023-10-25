import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViewEventDetailsModal from "./Components/Events_/ViewEventDetailsModal";

function PersonalDashboard() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  async function getToken() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      setToken(data["account"]);
    }
  }

  const handleClick = async (id, status) => {
    const attendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
    const groupsResponse = await fetch(attendeeUrl, {
      credentials: "include",
    });
    let attendeeId = 0;
    if (groupsResponse.ok) {
      const groupsData = await groupsResponse.json();
      for (let i = 0; i < groupsData.length; i++) {
        let currAttendee = groupsData[i];
        if (currAttendee.user_id === token.id) {
          attendeeId = currAttendee.id;
          break;
        }
      }
    }
    const url = `${process.env.REACT_APP_API_HOST}/attendees/${attendeeId}`;
    let m = {
      status,
    };
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(m),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    const eventsResponse = await fetch(url, fetchConfig);
    if (eventsResponse.ok) {
      const finished = await eventsResponse.json();
      console.log(finished);
    }
  };

  const fetchData = async () => {
    if (token) {
      const groupsUrl = `${process.env.REACT_APP_API_HOST}/users/${token?.id}/groups`;
      const eventsUrl = `${process.env.REACT_APP_API_HOST}/users/${token?.id}/events`;
      const friendsUrl = `${process.env.REACT_APP_API_HOST}/users/${token?.id}/friends`;

      const groupsResponse = await fetch(groupsUrl, { credentials: "include" });
      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();
        setGroups(groupsData);
      }
      const eventsResponse = await fetch(eventsUrl, { credentials: "include" });
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      }
      const friendsResponse = await fetch(friendsUrl, {
        credentials: "include",
      });
      if (friendsResponse.ok) {
        const friendsData = await friendsResponse.json();
        setFriends(friendsData);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <>
      <h1>{token.user_name}'s Dashboard</h1>
      <div>
        <button
          className="btn"
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
                {friends.map((friend) => {
                  return (
                    <li key={friend.user_name} className="list-group-item">
                      {friend.user_name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <hr className="dropdown-divider" />
            <button className="btn" type="button">
              <Link to={"/groups"}>Create a new Group</Link>
            </button>
            <hr className="dropdown-divider" />
            <button className="btn" type="button">
              <Link to={"/group_members"}>Add a Group Member</Link>
            </button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <h1>Events</h1>
            <div
              data-bs-spy="scroll"
              style={{ overflowY: "scroll", height: "750px" }}
            >
              <div className="col">
                <div className="">
                  <div className="row">
                    {events.map((event) => {
                      return (
                        <div key={`e-${event.id}`} className="col gy-5">
                          <div className="card" style={{ width: "18rem" }}>
                            <img
                              src={event.image_url}
                              className="card-img-top"
                              alt="Location"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{event.title}</h5>
                              <p className="card-text">{event.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                {event.time_date}
                              </li>
                              <li className="list-group-item">
                                {event.location}
                              </li>
                            </ul>
                            <div className="card-body">
                              <button
                                onClick={() => handleClick(event.id, "Going")}
                                type="button"
                                className="card-link"
                              >
                                Going
                              </button>
                              <button
                                onClick={() => handleClick(event.id, "Maybe")}
                                type="button"
                                className="card-link"
                              >
                                Maybe
                              </button>
                              <button
                                onClick={() =>
                                  handleClick(event.id, "Not Going")
                                }
                                type="button"
                                className="card-link"
                              >
                                Not Going
                              </button>
                            </div>
                            <ViewEventDetailsModal event={event} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalDashboard;
