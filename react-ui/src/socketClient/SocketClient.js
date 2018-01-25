import openSocket from 'socket.io-client';
const  socket = openSocket();

socket.on('connect', function(){
  console.log('socket connected');
});

socket.on('event', function(data){});
socket.on('disconnect', function(){
  console.log('disconnect');
});

socket.emit('event to server', { hello: 'world' });

function moveNow(x, y) {
  socket.emit('move-now', {
    left: x,
    right: y
  });
}

export default { socket, moveNow };