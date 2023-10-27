import React, { useState, useEffect } from "react";
import ViewEventDetailsModal from "./Components/ViewEventDetailsModal";
import SideMenu from "./Components/SideMenu";
import GroupForm from "./Components/GroupForm";
import useToken from "@galvanize-inc/jwtdown-for-react";

function PersonalDashboard() {
  const [token1, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);
  const { token } = useToken();

  async function getToken() {
    const url = `${process.env.REACT_APP_API_HOST}/token`;
    const response = await fetch(url, { credentials: "include" });

    if (response.ok) {
      const data = await response.json();
      setToken(data["account"]);
    }
  }

  const fetchData = async () => {
    if (token1) {
      const eventsUrl = `${process.env.REACT_APP_API_HOST}/users/${token1?.id}/events`;
      const friendsUrl = `${process.env.REACT_APP_API_HOST}/users/${token1?.id}/friends`;

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

  const handleClick = async (id, status) => {
    const attendeesUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
    const attendeesResponse = await fetch(attendeesUrl, {
      credentials: "include",
    });
    let attendeeId = 0;
    if (attendeesResponse.ok) {
      const attendeeData = await attendeesResponse.json();
      for (let i = 0; i < attendeeData.length; i++) {
        let currAttendee = attendeeData[i];
        if (currAttendee.user_id === token1?.id) {
          attendeeId = currAttendee.id;
          break;
        }
      }
    }
    const attendeeUrl = `${process.env.REACT_APP_API_HOST}/attendees/${attendeeId}`;
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
    const attendeeResponse = await fetch(attendeeUrl, fetchConfig);
    if (attendeeResponse.ok) {
      await attendeeResponse.json();
    }
  };

  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1, events]);

  return (
    <>
      <SideMenu friends={friends} />
      <h1>{token1?.user_name}'s Dashboard</h1>
      <div>
        <div className="group_member_outer_button">
          <GroupForm />
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
