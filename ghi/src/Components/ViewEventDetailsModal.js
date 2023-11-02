import { useState } from "react";

function ViewEventDetailsModal(props) {
  const [eventAttendees, setEventAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async (event, id) => {
    event.preventDefault();
    try {
      setLoading(true);
      const urlEventAttendees = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
      const response = await fetch(urlEventAttendees, {
        credentials: "include",
      });
      const data = await response.json();
      setEventAttendees(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button
        type="button"
        className="btn view-details"
        data-bs-toggle="modal"
        data-bs-target={`#eventModal${props.event.id}`}
        onClick={(event) => handleOpenModal(event, props.event.id)}
      >
        View Details
      </button>
      <div
        className="modal fade"
        id={`eventModal${props.event.id}`}
        tabIndex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="container-fluid">
                {loading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    {props.event && (
                      <div className="w-100">
                        <div className="w-100 attendee-div">
                          <img
                            src={
                              props.event.image_url.length > 0
                                ? props.event.image_url
                                : "https://media.tenor.com/lx2WSGRk8bcAAAAC/pulp-fiction-john-travolta.gif"
                            }
                            alt="Event Img"
                          />
                        </div>
                        <div>{props.event.title}</div>
                        <div>Location: {props.event.location}</div>
                        <div>
                          Date/Time:
                          {new Date(
                            props.event.event_time_date
                          ).toLocaleString()}
                        </div>
                        <div>Description: {props.event.description}</div>
                      </div>
                    )}
                    <div className="attendee-div">
                      <hr />
                      <div className="attendee-div">
                        <h5>
                          <u>Who is going???</u>
                        </h5>
                      </div>
                      {eventAttendees.map((eventAttendee) => {
                        return (
                          <div key={eventAttendee.id}>
                            <div>
                              <div>
                                {eventAttendee.user_name} {eventAttendee.status}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ViewEventDetailsModal;
