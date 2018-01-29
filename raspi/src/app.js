var socket = require('socket.io-client')('https://whispering-fjord-88916.herokuapp.com/', {
    reconnect: true
  });

  socket.on('connect', function () {
    console.log('connected');
    socket.emit('car-connect', {
      message: 'Hello server. I am a raspbian car'
    });
  });

  socket.on('move', function (data) {
    console.log(data);
  });