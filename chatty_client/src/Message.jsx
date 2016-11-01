import React, {Component} from 'react';

const Message = React.createClass({
  render: function() {
    const usernameStyle = {
      color: this.props.message.colour
    }
    return (
      <div className="message">
        <span style={usernameStyle} className="username">{this.props.message.username}</span>
        <span className="content">{this.props.message.content}</span>
      </div>
    );
  }
})
export default Message;





        