import openSocket from 'socket.io-client';
const  socket = openSocket();

socket.on('connect', function(){
  console.log('socket connected');
});

socket.on('event', function(data){});
socket.on('disconnect', function(){
  console.log('disconnect');
});

socket.on('move', data => {
  console.log(data);
})

socket.emit('event to server', { hello: 'world' });

export default socket;