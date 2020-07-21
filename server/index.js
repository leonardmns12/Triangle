const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = 3000;

io.on('connection', function(socket){
    console.log('a user connected');
  });

  server.listen(port, function(){
    console.log('listening on *:3000');
  });