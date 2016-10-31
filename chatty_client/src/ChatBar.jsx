import React, {Component} from 'react';

const ChatBar = React.createClass({
  getInitialState: function () {
    return {
      username: this.props.currentUser.name,
      content: ""
    };
  },
  handleChange(event) {
    this.setState({
      username: this.state.username,
      content: event.target.value
    });
  },
  handleUserChange(event) {
    this.setState({
      username: event.target.value
    });
  },
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onNewMessage(this.state);
    this.state.content = "";
  },
  render: function() {
    return (
      <footer>
        <form onSubmit={this.handleFormSubmit}>
          <input id="username" 
            type="text" 
            placeholder={this.props.currentUser.name} 
            value={this.state.username}
            onChange={this.handleUserChange}/>
          <input 
            id="new-message" 
            type="text" 
            placeholder="Type a message and hit ENTER"
            value={this.state.content}
            onChange={this.handleChange} />
          <input type="submit" label="Send"/>
        </form>
      </footer>
    );
  }
})
export default ChatBar;
