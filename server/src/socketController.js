import { Server } from 'http';
import socketIo from 'socket.io';

export default function controller(app) {
  var io = socketIo(Server(app));
  console.log('listen client...');

  io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
      console.log(data);
    });
  })
};
