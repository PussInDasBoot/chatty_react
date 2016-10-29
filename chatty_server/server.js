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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

  // ws.on('message', function incoming(message) {
  //   var msg = JSON.parse(message);
  //   console.log('User %s said %s', msg.username, msg.content);
  //   var message = {
  //     id: uuid.v4(),
  //     username: msg.username,
  //     content: msg.content
  //   };
  //   return JSON.stringify(message);
  // });
  // ws.on('message', function message(data) {
  //   wss.clients.forEach(function each(client) {
  //     if (client !== ws) client.send(data);
  //   });
  // });
  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    var message = {
      messageId: uuid.v4(),
      username: data.username,
      content: data.content,
    }
    wss.broadcast(JSON.stringify(message));
  }
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};