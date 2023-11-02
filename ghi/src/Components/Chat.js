import React from "react"; // Importing React library

// Functional component to display each message in a table row
function MessageRow(props) {
  const when = new Date(props.message.timestamp); // Convert timestamp to Date object
  return (
    <tr>
      {/* // Display client ID */}
      <td>{props.message.client_id}</td>
      {/* // Display localized timestamp */}
      <td>{when.toLocaleString()}</td>
      {/* // Display message content   */}
      <td>{props.message.content}</td>
    </tr>
  );
}

// Chat class component
class Chat extends React.Component {
  constructor(props) {
    super(props); // Call to the parent class constructor
    this.state = {
      // Initialize state
      messages: [], // Empty array for storing messages
      clientId: Number.parseInt(Math.random() * 10000000), // Generate a random client ID
      connected: false, // Connection status
      message: "", // Message input content
    };
    // Binding methods to `this`
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  // Method to establish WebSocket connection
  connect() {
    if (this.loading && !this.state.connected) {
      return; // If already loading and not connected, exit
    }
    this.loading = true; // Set loading to true
    const url = `ws://localhost:8000/chat/${this.state.clientId}`; // Define WebSocket URL
    this.socket = new WebSocket(url); // Create a new WebSocket object

    // Event listener for successful WebSocket connection
    this.socket.addEventListener("open", () => {
      this.setState({ connected: true });
      this.loading = false;
    });

    // Event listener for WebSocket close event
    this.socket.addEventListener("close", () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect(); // Retry connecting after 1 second
      }, 1000);
    });

    // Event listener for WebSocket error
    this.socket.addEventListener("error", () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect(); // Retry connecting after 1 second
      }, 1000);
    });

    // Event listener for receiving messages from WebSocket
    this.socket.addEventListener("message", (message) => {
      this.setState({
        messages: [
          JSON.parse(message.data), // Parse the received JSON message
          ...this.state.messages, // Spread existing messages
        ],
      });
    });
  }

  // Lifecycle method to connect when the component mounts
  componentDidMount() {
    this.connect();
  }

  // Method to send a message
  sendMessage(e) {
    e.preventDefault(); // Prevent default form submission
    this.socket.send(this.state.message); // Send the message
    this.setState({ message: "" }); // Clear the message input
  }

  // Method to update message state when typing
  updateMessage(e) {
    this.setState({ message: e.target.value }); // Update message state with input value
  }

  // Render method to display the component
  render() {
    return (
      <>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: {this.state.clientId}</h2>
        <form onSubmit={this.sendMessage}>
          <input
            value={this.state.message}
            className="form-control"
            type="text"
            id="messageText"
            autoComplete="off"
            onChange={this.updateMessage}
          />
          <button disabled={!this.state.connected} className="btn btn-primary">
            Send
          </button>
        </form>
        <h2>Messages</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Date/Time</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(
              (
                message // Map each message to a row
              ) => (
                <MessageRow
                  key={message.clientId + message.timestamp}
                  message={message}
                />
              )
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default Chat; // Export Chat component
