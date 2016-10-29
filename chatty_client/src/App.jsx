import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const App = React.createClass({
  getInitialState: function() {
    var data = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
    return {data: data};
  },
  // messageID: function () {
  //   return this.state.messages.length + 1;
  // },
  onNewMessage: function(message) {
    this.socket.send(JSON.stringify(message));
  },
  componentDidMount: function () {
    this.socket = new WebSocket("ws://localhost:4000");
    console.log("Connected to server");
    this.socket.onmessage = function(event) {
      var msg = JSON.parse(event.data);
      this.state.data.messages.push(msg);
      this.setState({data: this.state.data});
    };
  },
  render: function() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.data.messages}/>
        <ChatBar currentUser={this.state.data.currentUser} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
})

export default App;
