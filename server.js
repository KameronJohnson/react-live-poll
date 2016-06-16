var express = require('express');
var app = express();

var connections = [];

//use express middleware to serve static files
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Hip Hip Hooray! Polling server running");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

//when a socket disconnects, this 1 socket is removed from connections array
  socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    //to make sure socket disconnects from server
    socket.disconnect();
    console.log('Disconnected: %s sockets remaining', connections.length);
  });
  
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
})
