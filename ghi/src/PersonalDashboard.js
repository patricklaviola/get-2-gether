import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ViewEventDetailsModal from "./Components/Events_/ViewEventDetailsModal";


function PersonalDashboard(props) {
  const userId = useParams();
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const handleGoingClick = async (id) => {
    const allAttendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
    console.log(allAttendeeUrl);
    const response1 = await fetch(allAttendeeUrl, { credentials: "include" });
    let attendeeId = 0;
    if (response1.ok) {
      const data1 = await response1.json();
      console.log(data1);
      for (let i = 0; i < data1.length; i++) {
        let currAttendee = data1[i];
        if (currAttendee.user_id === userInfo.id) {
          attendeeId = currAttendee.id;
          break;
        }
      }
    }
    const url = `${process.env.REACT_APP_API_HOST}/attendees/${attendeeId}`;
    let m = {
      status: "Going",
    };
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(m),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    const response2 = await fetch(url, fetchConfig);
    if (response2.ok) {
      const finished = await response2.json();
      console.log(finished);
    }
  };
  const handleMaybeClick = async (id) => {
    const allAttendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
    const response1 = await fetch(allAttendeeUrl, { credentials: "include" });
    let attendeeId = 0;
    if (response1.ok) {
      const data1 = await response1.json();
      console.log(data1);
      for (let i = 0; i < data1.length; i++) {
        let currAttendee = data1[i];
        if (currAttendee.user_id === userInfo.id) {
          attendeeId = currAttendee.id;
          break;
        }
      }
    }
    const url = `${process.env.REACT_APP_API_HOST}/attendees/${attendeeId}`;
    let m = {
      status: "Maybe",
    };
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(m),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    const response2 = await fetch(url, fetchConfig);
    if (response2.ok) {
      const finished = await response2.json();
      console.log(finished);
    }
  };
  const handleNotGoingClick = async (id) => {
    const allAttendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
    const response1 = await fetch(allAttendeeUrl, { credentials: "include" });
    let attendeeId = 0;
    if (response1.ok) {
      const data1 = await response1.json();
      console.log(data1);
      for (let i = 0; i < data1.length; i++) {
        let currAttendee = data1[i];
        if (currAttendee.user_id === userInfo.id) {
          attendeeId = currAttendee.id;
          break;
        }
      }
    }
    const url = `${process.env.REACT_APP_API_HOST}/attendees/${attendeeId}`;
    let m = {
      status: "Not Going",
    };
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(m),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    const response2 = await fetch(url, fetchConfig);
    if (response2.ok) {
      const finished = await response2.json();
      console.log(finished);
    }
  };


  const fetchData = async () => {
    const url1 = `${process.env.REACT_APP_API_HOST}/groups`;
    const url2 = `${process.env.REACT_APP_API_HOST}/users/${userId.id}/events`;
    const url3 = `${process.env.REACT_APP_API_HOST}/users/${userId.id}/friends`;
    const url4 = `${process.env.REACT_APP_API_HOST}/token`;

    const response1 = await fetch(url1, { credentials: "include" });
    if (response1.ok) {
      const data1 = await response1.json();
      setGroups(data1);
    }
    const response2 = await fetch(url2, { credentials: "include" });
    if (response2.ok) {
      const data2 = await response2.json();
      console.log(data2);
      setEvents(data2);
    }
    const response3 = await fetch(url3, { credentials: "include" });
    if (response3.ok) {
      const data3 = await response3.json();
      console.log(data3);
      setFriends(data3);
    }
    const response4 = await fetch(url4, { credentials: "include" });
    if (response4.ok) {
      const data4 = await response4.json();
      console.log(data4["account"]);
      setUserInfo(data4["account"]);
    }
};


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
            Groups
          </button>
          <div className="collapse" id="collapseGroups">
            <ul className="list-group list-group-flush">
              {groups.map((group) => {
                return (
                  <li className="list-group-item">
                    <Link to={`/groups/${group.id}`}>
                      {group.group_name}
                    </Link>
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
            Your Friends
          </button>
          <div className="collapse" id="collapseFriends">
            <ul className="list-friend list-friend-flush">
              {friends.map((friend) => {
                return <li className="list-friend-item">{friend.user_name}</li>;
              })}
            </ul>
          </div>
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
                  {events.map((event, index) => {
                    return (
                      <div className="col gy-5">
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={event.image_url}
                            className="card-img-top"
                            alt="house"
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
                              onClick={() => handleGoingClick(event.id)}
                              type="button"
                              className="card-link"
                            >
                              Going
                            </button>
                            <button
                              onClick={() => handleMaybeClick(event.id)}
                              type="button"
                              className="card-link"
                            >
                              Maybe
                            </button>
                            <button
                              onClick={() => handleNotGoingClick(event.id)}
                              type="button"
                              className="card-link"
                            >
                              Not Going
                            </button>
                          </div>
                          <ViewEventDetailsModal event={events[index]} />
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
  );
}

export default PersonalDashboard;