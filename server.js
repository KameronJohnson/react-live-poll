var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Default Presentation Title';
var audience = [];
var speaker = {};

//use express middleware to serve static files
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Hip Hip Hooray! Polling server running");
});

var io = require('socket.io').listen(server);

//io.sockets refers to every socket
io.sockets.on('connection', function(socket) {


  socket.once('disconnect', function() {
    
    //_.findWhere takes an array, and returns item based on query paramters
    //this.id is the socket that just disconnected
    var member = _.findWhere(audience, { id: this.id });
    
    //remove this audience member from the audience array
    if (member) {
      audience.splice(audience.indexOf(member), 1);
      //now broadcast to all sockets 
      io.sockets.emit('audience', audience);
      console.log("%s has disconnected. %s left in audience.", member.name, audience.length)
    }
    
    //when a socket disconnects, this 1 socket is removed from connections array
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
      name: payload.name,
      type: 'member'
    };
    //joined event fires back to client when new member joins 
    this.emit('joined', newMember);
    audience.push(newMember);
    //when audience changes, broadcast audience events on all sockets.
    io.sockets.emit('audience', audience);
    console.log("Everybody welcome %s to the Audience!", payload.name)
  });
  
  //start the presentation with speaker
  socket.on('start', function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = speaker;
    //use joined method from newMember but pass speaker info
    this.emit('joined', speaker);
    console.log("Presentation started: '%s' by %s", title, speaker.name);
  });
  
  //emit welcome event handled by the client
  socket.emit('welcome', {
    title: title
  });
  
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
})
