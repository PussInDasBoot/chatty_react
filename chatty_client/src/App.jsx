import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    var data = {
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
          this.setState({data: this.state.data});
          // Removes notification when there is an incoming message;
          var notification = document.getElementById("notification");
          notification.innerHTML = "";
          break;
        case "incomingNotification":
          var notification = document.getElementById("notification");
          notification.innerHTML = data.content;
          break;
        case "updateOnlineUsers":
          var clientCount = document.getElementById("clientCount");
          if (data.clientCount > 1) {
            clientCount.innerHTML = data.clientCount + " users online";
          } else {
            clientCount.innerHTML = data.clientCount + " user online";
          }
          break;
        default:
        // show an error in the console if the message type is unknown
        // throw new Error("Unknown event type " + data.type);
      }
    };
  },
  render: function() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1><h2 id="clientCount"></h2>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar onPost={this.onPost}/>
      </div>
    );
  }
})

export default App;
