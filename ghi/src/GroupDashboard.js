import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function GroupDashboard(props) {
  // const { token } = useAuthContext();
  // const messagesEndRef = React.createRef();
  const groupId = useParams();
  const [events, setEvents] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setMessage] = useState("");
  // const [timeStamp, setTimeStamp] = useState("");
  // const [userInfo] = useAuthContext();
  // const [eventAttendees, setEventAttendees] = useState([]);
  // const [groupInfo, setGroupInfo] = useState({});

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleMessage = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
    const m = {
      message: incomingMessage,
      created_on: "2023-10-19T21:28:29.472000",
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
      // scrollToBottom();
    }
  };

  // const fetchGroupInfo = async () => {
  //   const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}`;
  //   console.log(url);
  //   const response = await fetch(url, { credentials: "include" });
  //   if (response.ok) {
  //     const data = await response.json();
  //     setGroupInfo(data);
  //   }
  // };

  // const fetchGroupMembers = async () => {
  //   const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/group_members`;
  //   const response = await fetch(url, { credentials: "include" });
  //   if (response.ok) {
  //     const data = await response.json();
  //     setGroupMembers(data);
  //   }
  // };

  // const fetchEvents = async () => {
  //   const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/events`;
  //   const response = await fetch(url, { credentials: "include" });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data);
  //     setEvents(data);
  //   }
  // };

  const fetchMessages = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setMessages(data);
    }
  };

  const fetchData = async () => {
    const url1 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/group_members`;
    const url2 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/events`;
    const url3 = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/messages`;

    const response1 = await fetch(url1, { credentials: "include" });
    if (response1.ok) {
      const data1 = await response1.json();
      setGroupMembers(data1);
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
      setMessages(data3);
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
                return <li className="list-group-item">{member.user_name}</li>;
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
              <li className="list-group-item">Group 1</li>
              <li className="list-group-item">Group 2</li>
              <li className="list-group-item">Group 3</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h1>Events</h1>
          <div
            className="col-6"
            data-bs-spy="scroll"
            style={{ "overflow-y": "scroll", height: "750px" }}
          >
            <div className="col">
              <div className="">
                <div className="row">
                  {events.map((event) => {
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
                            <a
                              href="https://www.google.com/"
                              className="card-link"
                            >
                              Going
                            </a>
                            <a
                              href="https://www.google.com/"
                              className="card-link"
                            >
                              Maybe
                            </a>
                            <a
                              href="https://www.google.com/"
                              className="card-link"
                            >
                              Not Going
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <br></br> */}
          <div className="col-6">
            <div className="card">
              <div className="col card-body">
                <div class="col">
                  <ul class="list-unstyled">
                    <div style={{ height: "550px", "overflow-y": "scroll" }}>
                      {messages.map((m) => {
                        if (m.user_id === 1) {
                          return (
                            <li class="d-flex justify-content-between mb-4">
                              <div class="card w-100">
                                <div class="card-header d-flex justify-content-between p-3">
                                  <p class="fw-bold mb-0">{m.user_id}</p>
                                  <p class="text-muted small mb-0">
                                    <i class="far fa-clock"></i> {m.created_on}
                                  </p>
                                </div>
                                <div class="card-body">
                                  <p class="mb-0">{m.message}</p>
                                </div>
                              </div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                alt="avatar"
                                class="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                width="60"
                              />
                            </li>
                          );
                        } else {
                          return (
                            <li class="d-flex justify-content-between mb-4">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                alt="avatar"
                                class="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60"
                              />
                              <div class="card">
                                <div class="card-header d-flex justify-content-between p-3">
                                  <p class="fw-bold mb-0">Brad Pitt</p>
                                  <p class="text-muted small mb-0">
                                    <i class="far fa-clock"></i> 10 mins ago
                                  </p>
                                </div>
                                <div class="card-body">
                                  <p class="mb-0">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        }
                      })}
                      {/* <div ref={this.messagesEndRef} /> */}
                    </div>
                    <li class="bg-white mb-3">
                      <div class="form-outline">
                        <textarea
                          onChange={handleMessageChange}
                          class="form-control"
                          id="textAreaExample2"
                          rows="4"
                          value={incomingMessage}
                        ></textarea>
                        <label class="form-label" for="textAreaExample2">
                          Message
                        </label>
                      </div>
                    </li>
                    <button
                      onClick={handleMessage}
                      type="button"
                      class="btn btn-info btn-rounded float-end"
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
