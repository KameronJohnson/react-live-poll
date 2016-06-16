var express = require('express');

var app = express();

//use express middleware to serve static files
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Hip Hip Hooray! Polling server running");
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  console.log('Connected: %s', socket.id);
})
