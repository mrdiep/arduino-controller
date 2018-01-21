import { createServer } from 'http';
import SocketIo from 'socket.io';

export default function controller(app) {
  var server = createServer(app);
  var io = new SocketIo(server);
  console.log('listen client...');

  io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
      console.log(data);
    });
  })

  return server;
};
