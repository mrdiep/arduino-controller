import { createServer } from 'http';
import SocketIo from 'socket.io';

export default function controller(app) {
  var server = createServer(app);
  var io = new SocketIo(server);
  console.log('Socket is waiting a client...');
  var carId;

  io.on('connection', function(client) {
    console.log('Client connected...');
    console.log(client);

    client.on('join', function(data) {
      console.log(data);
    });

    client.on('car-connect', data => {
      carId = client.id;
    })

    client.on('move-now', data => {
      console.log(data);
      client.to(carId).emit('move', data);
    })
  })

  return { server, SocketIO: io};
};
