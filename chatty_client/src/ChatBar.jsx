import React, {Component} from 'react';

const ChatBar = React.createClass({
  getInitialState: function () {
    return {
      previoususer: this.props.currentUser,
      username: this.props.currentUser,
      content: "",
      notification: "",
      type: ""
    };
  },
  // Updates state when user field is updated
  handleUserState(event) {
    this.setState({
      username: event.target.value,
      notification: this.state.previoususer + " has changed their name to " + event.target.value,
      type: "postNotification"
    });
  },
  // Sends state to App when you hit enter on the username field
  handleUserChange(event) {
    if (event.key === 'Enter') {
      this.setState({
        previoususer: this.state.username
      });
    } else if (event.key === 'Enter' && this.props.currentUser != this.state.username) {
      this.props.onPost(this.state);
    }
  },
  // Updates state when message field is updated
  handleMessageChange(event) {
    this.setState({
      content: event.target.value,
      type: "postMessage"
    });
  },
  // Sends message to server on form submit, resets message field to blank
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onPost(this.state);
    this.state.content = "";
  },
  render: function() {
    return (
      <footer>
        <form onSubmit={this.handleFormSubmit}>
          <input id="username" 
            type="text" 
            placeholder={this.props.currentUser} 
            value={this.state.username}
            onChange={this.handleUserState}
            onKeyUp={this.handleUserChange}/>
          <input 
            id="new-message" 
            type="text" 
            placeholder="Type a message and hit ENTER"
            value={this.state.content}
            onChange={this.handleMessageChange} />
          <input type="submit" label="Send"/>
        </form>
      </footer>
    );
  }
})
export default ChatBar;
