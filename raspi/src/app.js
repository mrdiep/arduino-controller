var socket = require('socket.io-client')('http://localhost:3004', { reconnect: true });
console.log('kaka')
socket.on('connect', function(){
    console.log('connected');
});

socket.on('event', function(data){});
socket.on('disconnect', function(){
    console.log('disconnect');
});

socket.emit('event to server', { hello: 'world' });