// socket.io chat server

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 1337);
var io = require('socket.io').listen(server);

// serve public assets
app.use(express.static('public'));

// sockets
io.sockets.on('connection', function(client) {

  // when a message is received, emit to all clients.
  client.on('message:client', function(data) {
    client.broadcast.emit('message:server', {message: data.message});
  });
});
