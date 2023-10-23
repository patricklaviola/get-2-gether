import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateEventModalForm() {
  const groupId = useParams();


  const [formData, setFormData] = useState({
    title: "",
    location: "",
    image_url: "",
    event_time_date: "",
    description: "",
    events: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEvent_url = `${process.env.REACT_APP_API_HOST}/groups/${groupId.id}/events`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    };

    const response = await fetch(newEvent_url, fetchConfig);
    if (response.ok) {
      setFormData({
        title: "",
        location: "",
        image_url: "",
        event_time_date: "",
        description: "",
        events: "",
      });
    }
  };

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#Modal"
      >
        Create Event
      </button>
      <div
        className="modal fade"
        id="Modal"
        tabIndex="-1"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel">
                Create Event
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit} id="create-event-form">
              <div className="modal-body">
                <div>
                  <div>
                    <label htmlFor="title">Title</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Title"
                      required
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="location">Location</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Location"
                      required
                      name="location"
                      className="form-control"
                      value={formData.location}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="image_url">Image</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Image"
                      name="image_url"
                      className="form-control"
                      value={formData.image_url}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="event_time_date">Time/Date</label>
                  </div>
                  <div>
                    <input
                      type="datetime-local"
                      placeholder="Time/Date"
                      required
                      name="event_time_date"
                      className="form-control"
                      value={formData.event_time_date}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="description">Description</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Description"
                      required
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateEventModalForm;
