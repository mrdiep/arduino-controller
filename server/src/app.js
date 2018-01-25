import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import homeController from './homeController';
import socketController from './socketController';

const httpPort = process.env.PORT || 3004;

const app = express();
const { server, SocketIO } = socketController(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());
app.use(cookieParser());
app.use(helmet());

app.use('/', homeController(SocketIO));
app.use(express.static(path.join(__dirname, '../../react-ui/build')));

server.listen(httpPort);
console.log('Server start at port: ' + httpPort);

process.on('SIGINT', () => {
  server.close();
  process.exit();
});

process.on('uncaughtException', function(err) {
  console.log(err.stack);
  throw err;
});
