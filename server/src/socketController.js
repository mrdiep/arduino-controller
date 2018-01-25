import { createServer } from 'http';
import SocketIo from 'socket.io';

export default function controller(app) {
  var server = createServer(app);
  var io = new SocketIo(server);
  console.log('Socket is waiting a client...');
  var carId;

  io.on('connection', function(client) {
    console.log('Client connected...: ' + client.id);

    client.on('join', function(data) {
      console.log(data);
    });

    client.on('car-connect', carInfo => {
      carId = client.id;
      console.log(carInfo.message);
    })

    client.on('move-now', data => {
      console.log(data);
      client.to(carId).emit('move', data);
    })
  })

  return { server, SocketIO: io};
};
