var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = 'Default Presentation Title';
var audience = [];
var speaker = {};
var questions = require('./questions');
//start with no question
var currentQuestion = false;
var results = {
  a: 0,
  b: 0,
  c: 0,
  d: 0
};

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
    } //if a speaker leaves... 
    else if (this.id === speaker.id) {
      console.log("%s has left. '%s' has been terminated.", speaker.name, title);
      speaker = {};
      title = "Default Presentation Title";
      io.sockets.emit('end', { title: title, speaker: '' });
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
      type: 'audience'
    };
    //joined event fires back to client when new member joins 
    this.emit('joined', newMember);
    audience.push(newMember);
    //when audience changes, broadcast audience events on all sockets.
    io.sockets.emit('audience', audience);
    console.log("Everybody welcome %s to the Audience!", payload.name)
  });
  
  //start the presentation with speaker
  //save info about speaker
  socket.on('start', function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = 'speaker';
    title = payload.title;
    //use joined method from newMember but pass speaker info
    this.emit('joined', speaker);
    //broadcast to all sockets title and speaker
    io.sockets.emit('start', { title: title, speaker: speaker.name });
    console.log("Presentation started: '%s' by %s", title, speaker.name);
  });
  
  socket.on('ask', function(question) {
    currentQuestion = question;
    //clear out results from previous question
    results = {a:0, b:0, c:0, d:0};
    io.sockets.emit('ask', currentQuestion);
    console.log("Question asked: '%s'", question.q);
  });
  
  socket.on('answer', function(payload) {
    results[payload.choice]++;   //gather answer from audience, increment that value
    io.sockets.emit('results', results); //pass results object, get answer data from server to client
    console.log("Answer: '%s' - %j", payload.choice, results);
  });
  
  //emit welcome event handled by the client
  socket.emit('welcome', {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results: results
  });
  
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);
});
