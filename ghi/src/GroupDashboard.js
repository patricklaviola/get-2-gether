import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateEventModalForm from "./Components/CreateEventModalForm";
import ViewEventDetailsModal from "./Components/ViewEventDetailsModal";
import SideMenu from "./Components/SideMenu";
import AddGroupMemberForm from "./Components/AddGroupMemberForm";

function GroupDashboard() {
  const C3POIcon = require("./icons/c3po.png");
  const stormTrooperIcon = require("./icons/stormtrooper.jpg");
  const groupId = useParams();
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [messageDisplay, setMessageDisplay] = useState("");
  const [group, setGroup] = useState({});
  const [change, setChange] = useState(false);

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessageDisplay(value);
  };

  const handleMessage = async () => {
    try {
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
        await response.json();
        fetchMessages();
      }
      setMessageDisplay("");
    } catch (error) {
      console.error("Unable to post message:", error);
    }
  };

  const handleGoingClick = async (id) => {
    try {
      const allAttendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
      const response1 = await fetch(allAttendeeUrl, { credentials: "include" });
      let attendeeId = 0;
      if (response1.ok) {
        const data1 = await response1.json();
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
        await response2.json();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleMaybeClick = async (id) => {
    try {
      const allAttendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
      const response1 = await fetch(allAttendeeUrl, { credentials: "include" });
      let attendeeId = 0;
      if (response1.ok) {
        const data1 = await response1.json();
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
        await response2.json();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleNotGoingClick = async (id) => {
    try {
      const allAttendeeUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
      const response1 = await fetch(allAttendeeUrl, { credentials: "include" });
      let attendeeId = 0;
      if (response1.ok) {
        const data1 = await response1.json();
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
        await response2.json();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const url4 = `${process.env.REACT_APP_API_HOST}/token`;
      const response4 = await fetch(url4, { credentials: "include" });
      if (response4.ok) {
        const data4 = await response4.json();
        setToken(data4);
        setUserInfo(data4["account"]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const url1 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/group_members`;
      const response1 = await fetch(url1, { credentials: "include" });
      if (response1.ok) {
        const data1 = await response1.json();
        setGroupMembers(data1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const url2 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/events`;
      const url3 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
      const url4 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}`;

      const response2 = await fetch(url2, { credentials: "include" });
      if (response2.ok) {
        const data2 = await response2.json();
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
    } catch (error) {
      console.error("Error fetching data:", error);
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
  }, [token, groupId, change]);

  useEffect(() => {
    const chatwindow = document.querySelector("#chatwindow");
    chatwindow.scrollTo(0, chatwindow.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className="dashboard">
      <div className="position-absolute top-0 start-0">
        <SideMenu
          userInfo={userInfo}
          groupMembers={groupMembers}
          fetchGroupMembers={fetchGroupMembers}
          group={group}
        />
      </div>
      <div className="group_member_outer_button">
        <p className="dash-title">{group.group_name} Dashboard</p>
        <AddGroupMemberForm change={change} setChange={setChange} />
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-row justify-content-between">
              <h4 className="mt-2">Events</h4>
              <CreateEventModalForm
                groupMembers={groupMembers}
                change={change}
                setChange={setChange}
              />
            </div>
            <div
              className="row"
              data-bs-spy="scroll"
              style={{ overflowY: "auto", maxHeight: 825 }}
            >
              <div className="">
                <div className="row">
                  {events.map((event) => {
                    return (
                      <div key={event.id} className="col gy-5">
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={
                              event.image_url.length > 0
                                ? event.image_url
                                : "https://media.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
                            }
                            className="card-img-top"
                            alt="house"
                            style={{ width: "auto", height: "auto" }}
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
                              {new Date(event.event_time_date).toLocaleString()}
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
          <div className="col" id="chat-pane">
            <h4 className="mt-2">Chat</h4>
            <div className="card">
              <div className="col card-body">
                <div className="">
                  <ul className="list-unstyled">
                    <div
                      id="chatwindow"
                      style={{ overflowY: "auto", height: "590px" }}
                    >
                      <div className="chat-container">
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
                                      <p className="text-light small  mb-0">
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
                                    <div className="card-header d-flex justify-content-between p-3 bg">
                                      <p className="fw-bold mb-0">
                                        {m.user_name}
                                      </p>
                                      <p className="text-light small mb-0">
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
                      <div
                        className="form-outline"
                        style={{ background: "#35a29f" }}
                      >
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
                      className="btn btn-info btn-rounded float-end create-message"
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
