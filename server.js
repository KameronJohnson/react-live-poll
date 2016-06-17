var express = require('express');
var app = express();

var connections = [];
var title = 'Default Presentation Title';

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
  
  //payload is data from join form in Join component
  socket.on('join', function(payload) {
    var newMember = {
      //new member given socket id
      id: this.id,
      name: payload.name
    };
    //joined event fires back to client when new member joins 
    this.emit('joined', newMember);
    console.log("Everybody welcome %s to the Audience!", payload.name)
  });
  
  //emit welcome event handled by the client
  socket.emit('welcome', {
    title: title
  });
  
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
})
