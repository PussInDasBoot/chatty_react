import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

var data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

const App = React.createClass({
  getInitialState: function () {
    return data;
  },
  messageID: function () {
    return this.state.messages.length + 1;
  },
  onNewMessage: function(message) {
    this.socket.send(JSON.stringify(message));
  },
  componentDidMount: function () {
    this.socket = new WebSocket("ws://localhost:4000");
    console.log("Connected to server");
  },
  render: function() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
})

export default App;
