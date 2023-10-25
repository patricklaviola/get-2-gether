import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CreateEventModalForm from "./Components/Events_/CreateEventModalForm";
import ViewEventDetailsModal from "./Components/Events_/ViewEventDetailsModal";

function GroupDashboard(props) {
  const C3POIcon = require("./icons/c3po.png");
  const stormTrooperIcon = require("./icons/stormtrooper.jpg");
  const groupId = useParams();
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [messageDisplay, setMessageDisplay] = useState("");
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessageDisplay(value);
  };

  const handleMessage = async (event) => {
    const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
    const m = {
      message: messageDisplay,
    };
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(m),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const finished = await response.json();
      console.log(finished);
      fetchMessages();
    }
    setMessageDisplay("");
  };

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
        fetchGroupMembers();
      }
    }
  };

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

  const fetchMessages = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      console.log("fetching messages");
      setMessages(data);
    }
  };

  const fetchUserInfo = async () => {
    const url4 = `${process.env.REACT_APP_API_HOST}/token`;
    const response4 = await fetch(url4, { credentials: "include" });
    if (response4.ok) {
      const data4 = await response4.json();
      console.log(data4);
      setToken(data4);
      setUserInfo(data4["account"]);
    }
  };

  const fetchGroupMembers = async () => {
    const url1 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/group_members`;
    const response1 = await fetch(url1, { credentials: "include" });
    if (response1.ok) {
      const data1 = await response1.json();
      setGroupMembers(data1);
    }
  };

  const fetchData = async () => {
    const url2 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/events`;
    const url3 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
    const url4 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/`;

    const response2 = await fetch(url2, { credentials: "include" });
    if (response2.ok) {
      const data2 = await response2.json();
      console.log(data2);
      setEvents(data2);
    }
    const response3 = await fetch(url3, { credentials: "include" });
    if (response3.ok) {
      const data3 = await response3.json();
      setMessages(data3);
    }
    const response4 = await fetch(url4, { credentials: "include" });
    if (response4.ok) {
      const data4 = await response4.json();
      setGroup(data4);
    }

    if (token && token.account) {
      const url5 = `${process.env.REACT_APP_API_HOST}/users/${userInfo.id}/groups`;
      const response5 = await fetch(url5, { credentials: "include" });
      if (response5.ok) {
        const data5 = await response5.json();
        setGroups(data5);
      }
    }
  };
  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    fetchGroupMembers();
    let m = setInterval(fetchMessages, 2000);
    return () => clearInterval(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
            Group Menu
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
            data-bs-target="#collapseMembers"
          >
            Group Members
          </button>
          <div className="collapse" id="collapseMembers">
            <ul className="list-group list-group-flush">
              {groupMembers.map((member) => {
                if (userInfo.id === group.creator_id) {
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
          <hr className="dropdown-divider" />
          <button
            className="btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseGroups"
          >
            Your Groups
          </button>
          <div className="collapse" id="collapseGroups">
            <ul className="list-group list-group-flush">
              {groups.map((group, index) => {
                return (
                  <li key={index} className="list-group-item">
                    <Link to={`/groups/${group.id}`}>{group.group_name}</Link>
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
      <h2>{group.group_name} Dashboard</h2>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h4>Events</h4>
            <div
              className="col"
              data-bs-spy="scroll"
              style={{ overflowY: "auto", height: "820px", width: "40rem" }}
            >
              <div className="">
                <div className="row">
                  <CreateEventModalForm groupMembers={groupMembers} />
                  {events.map((event, index) => {
                    return (
                      <div key={event.id} className="col gy-5">
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
                          <ViewEventDetailsModal event={event} />
                        </div>
                        <br />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <br></br> */}
          <div className="col-6">
            <h4>Chat</h4>
            <div className="card">
              <div className="col card-body">
                <div className="col">
                  <ul className="list-unstyled">
                    <div
                      style={{
                        height: "590px",
                        overflowY: "auto",
                        transform: "rotate(180deg)",
                        direction: "rtl",
                      }}
                    >
                      <div
                        style={{
                          paddingBottom: "10px",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {messages
                          .sort((a, b) => {
                            return b.created_on > a.created_on;
                          })
                          .map((m) => {
                            if (m.user_id === userInfo.id) {
                              return (
                                <li
                                  key={m.id}
                                  className="d-flex justify-content-between mb-4"
                                >
                                  <div className="card w-100">
                                    <div className="card-header d-flex justify-content-between p-3">
                                      <p className="fw-bold mb-0">
                                        {m.user_name}
                                      </p>
                                      <p className="text-muted small mb-0">
                                        {new Date(
                                          m.created_on + "-00:00"
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="card-body">
                                      <p className="mb-0">{m.message}</p>
                                    </div>
                                  </div>
                                  <img
                                    src={C3POIcon}
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                    width="60"
                                  />
                                </li>
                              );
                            } else {
                              return (
                                <li
                                  key={m.id}
                                  className="d-flex justify-content-between mb-4"
                                >
                                  <img
                                    src={stormTrooperIcon}
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                    width="60"
                                  />
                                  <div className="card w-100">
                                    <div className="card-header d-flex justify-content-between p-3">
                                      <p className="fw-bold mb-0">{m.user_name}</p>
                                      <p className="text-muted small mb-0">
                                        <i className="far fa-clock"></i>{" "}
                                        {new Date(
                                          m.created_on + "-00:00"
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="card-body">
                                      <p className="mb-0">{m.message}</p>
                                    </div>
                                  </div>
                                </li>
                              );
                            }
                          })}
                      </div>
                    </div>
                    <hr className="dropdown-divider" />
                    <li className="bg-white mb-3">
                      <div className="form-outline">
                        <textarea
                          onChange={handleMessageChange}
                          className="form-control"
                          id="textAreaExample2"
                          rows="4"
                          value={messageDisplay}
                        ></textarea>
                        <label
                          className="form-label"
                          htmlFor="textAreaExample2"
                        >
                          Message
                        </label>
                      </div>
                    </li>
                    <button
                      onClick={handleMessage}
                      type="button"
                      className="btn btn-info btn-rounded float-end"
                    >
                      Send
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDashboard;
