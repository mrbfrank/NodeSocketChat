// socket.io chat server

var fs = require('fs');
var express = require('express');
var app = express();
var server = app.listen(1337);
var io = require('socket.io').listen(server);

// index.html
app.get('/', function(req, res) {
	fs.createReadStream('index.html').pipe(res);
});

// sockets
io.sockets.on('connection', function(client) {

	// when a message is received, emit to all clients.
	client.on('message:client', function(data) {
		client.broadcast.emit('message:server', {message: data.message});
	});
});
