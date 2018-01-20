import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import path from 'path';


import homeController from './homeController';
import socketController from './socketController';

const httpPort = process.env.PORT || 3003;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(compress());
app.use(cookieParser());
app.use(helmet());

app.use('/', homeController);
app.use(express.static(path.join(__dirname, '../../react-ui/build')));

// START AND STOP
//const server = app.listen(httpPort, () => {});

const server = socketController(app);
server.listen(httpPort);

process.on('SIGINT', () => {
  server.close();
  process.exit();
});

process.on('uncaughtException', function(err) {
  console.log(err.stack);
  throw err;
});
