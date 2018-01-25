var socket = require('socket.io-client')('http://localhost:3004', { reconnect: true });

socket.on('connect', function(){
    console.log('connected');
    socket.emit('event to server', { message: 'Hello server. I am a raspbian' });
});

socket.on('move', function(data){
    console.log(data);
});

socket.on('disconnect', function(){
    console.log('disconnect');
});