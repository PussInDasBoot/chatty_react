import React, {Component} from 'react';

const ChatBar = React.createClass({
  getInitialState: function () {
    return {value: 'Hello!'};
  },
  handleChange(event) {
    this.setState({value: event.target.value});
  },
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.onNewMessage(this.state);
  },
  render: function() {
    return (
      <footer>
        <form onSubmit={this.handleFormSubmit}>
          <input id="username" type="text" placeholder={this.props.currentUser.name} />
          <input 
            id="new-message" 
            type="text" 
            placeholder="Type a message and hit ENTER"
            value={this.state.value}
            onChange={this.handleChange} />
          <input type="submit" label="Send"/>
        </form>
      </footer>
    );
  }
})
export default ChatBar;
