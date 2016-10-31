import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function() {
    return (
      <div id="message-list">
        {this.props.messages.map((message) => (
            <Message key={message.messageId} message={message}/>
          ))}
        <div id="notification">
        </div>
      </div>
    );
  }
})
export default MessageList;
