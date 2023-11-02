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
    try {
      const url = `${process.env.REACT_APP_API_HOST}/token`;
      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }
      const data = await response.json();
      setToken(data["account"]);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }

  const fetchData = async () => {
    try {
      if (token1) {
        const eventsUrl = `${process.env.REACT_APP_API_HOST}/users/${token1?.id}/events`;
        const friendsUrl = `${process.env.REACT_APP_API_HOST}/users/${token1?.id}/friends`;

        const eventsResponse = await fetch(eventsUrl, {
          credentials: "include",
        });
        const friendsResponse = await fetch(friendsUrl, {
          credentials: "include",
        });

        if (!eventsResponse.ok || !friendsResponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
        const friendsData = await friendsResponse.json();
        setFriends(friendsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = async (id, status) => {
    try {
      const attendeesUrl = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
      const attendeesResponse = await fetch(attendeesUrl, {
        credentials: "include",
      });
      if (!attendeesResponse.ok) {
        throw new Error("Failed to fetch attendees");
      }

      let attendeeId = 0;
      const attendeeData = await attendeesResponse.json();
      for (let i = 0; i < attendeeData.length; i++) {
        let currAttendee = attendeeData[i];
        if (currAttendee.user_id === token1?.id) {
          attendeeId = currAttendee.id;
          break;
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

      if (!attendeeResponse.ok) {
        throw new Error("Failed to update status");
      }

      await attendeeResponse.json();
    } catch (error) {
      console.error("Error updating status:", error);
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
      <div>
        <div className="position-absolute top-0 start-0">
          <SideMenu friends={friends} />
        </div>
        <div>
          <p className="dash-title">{token1?.user_name}'s Dashboard</p>
          <div className="group_member_outer_button"></div>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="d-flex justify-content-between">
                  <h1>Events</h1>
                  <GroupForm />
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
                          <div key={`e-${event.id}`} className="col-4 gy-3">
                            <div className="card" style={{ width: "18rem" }}>
                              <img
                                src={
                                  event.image_url.length > 0
                                    ? event.image_url
                                    : "/g2g.png"
                                }
                                className="card-img-top"
                                alt="Location"
                              />
                              <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text">{event.description}</p>
                              </div>
                              <div>
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item">
                                    {new Date(
                                      event.event_time_date
                                    ).toLocaleString()}
                                  </li>
                                  <li className="list-group-item">
                                    {event.location}
                                  </li>
                                </ul>
                              </div>
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
      </div>
    </>
  );
}

export default PersonalDashboard;
