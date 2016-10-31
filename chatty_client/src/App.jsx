import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    var data = {
      currentUser: "Bob",
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    return {data: data};
  },
  // Sends messages to server
  onPost: function(data) {
    this.socket.send(JSON.stringify(data));
  },
  // Sets up websocket and updates state when messages are received from the server
  componentDidMount: function () {
    this.socket = new WebSocket("ws://localhost:4000");
    console.log("Connected to server");
    this.socket.onmessage = (event) => {
      var data = JSON.parse(event.data);
      switch(data.type) {
        case "incomingMessage":
          this.state.data.messages.push(data);
          this.state.data.currentUser = data.username;
          this.setState({data: this.state.data});
          break;
        case "incomingNotification":
          this.state.data.currentUser = data.username;
          this.setState({data: this.state.data});
          var notification = document.getElementById("notification");
          notification.innerHTML = data.content;
          break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
      }
    };
  },
  render: function() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.currentUser} onPost={this.onPost}/>
      </div>
    );
  }
})

export default App;
