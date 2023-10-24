import { useState } from "react";

function ViewEventDetailsModal(props) {
  const [eventAttendees, setEventAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async (event, id) => {
    event.preventDefault();
      setLoading(true);
    const urlEventAttendees = `${process.env.REACT_APP_API_HOST}/events/${id}/attendees`;
    const response = await fetch(urlEventAttendees, {
      credentials: "include",
    });
    const data = await response.json();
    setEventAttendees(data);
    setLoading(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
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
                      <div>
                        <div>
                          <img
                            src={props.event.image_url}
                            alt="Event Img"
                          />
                        </div>
                        <div>{props.event.title}</div>
                        <div>Location: {props.event.location}</div>
                        <div>
                          Date/Time:
                          {new Date(props.event.event_time_date).toLocaleString(
                            "en-US",
                            { timeZone: "UTC" }
                          )}
                        </div>
                        <div>Description: {props.event.description}</div>
                      </div>
                    )}
                    <div>
                      <div>Who is going???</div>
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
