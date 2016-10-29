import React, {Component} from 'react';
import Message from './Message.jsx';

const MessageList = React.createClass({
  render: function() {
    return (
      <div id="message-list">
        {this.props.messages.map((message) => (
            <Message key={message.id} message={message}/>
          ))}
      </div>
    );
  }
})
export default MessageList;
