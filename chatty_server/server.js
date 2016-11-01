// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
  var updateOnlineUsers = {
    clientCount: wss.clients.length,
    type: "updateOnlineUsers",
  }
  const userColour = chooseColour(wss.clients.length);
  wss.broadcast(JSON.stringify(updateOnlineUsers));
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    var updateOnlineUsers = {
      clientCount: wss.clients.length,
      type: "updateOnlineUsers",
    }
    wss.broadcast(JSON.stringify(updateOnlineUsers));
  });

  ws.onmessage = function (event) {
    const incomingData = JSON.parse(event.data);
    switch(incomingData.type) {
      case "postMessage":
        var outgoingData = {
          messageId: uuid.v4(),
          username: incomingData.username,
          content: incomingData.content,
          type: "incomingMessage",
          colour: userColour
        }
        wss.broadcast(JSON.stringify(outgoingData));
        break;
      case "postNotification":
        console.log(incomingData);
        var outgoingData = {
          messageId: uuid.v4(),
          username: incomingData.username,
          content: incomingData.notification,
          type: "incomingNotification"
        }
        wss.broadcast(JSON.stringify(outgoingData));
        break;
      default:
      // TODO add error here
        throw new Error("Unknown event type " + incomingData.type);
    }
  }
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

function chooseColour(num) {
  var colours = ["#800080", "#FFA500", "#008080", "#008000"];
  // var num = Math.floor(Math.random() * 4)
  console.log(colours[num-1]);
  return colours[num - 1];
}