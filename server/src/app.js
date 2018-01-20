import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';

import homeController from './homeController';

const httpPort = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(compress());
app.use(cookieParser());
app.use(helmet());

app.use('/', homeController);

// START AND STOP
const server = app.listen(httpPort, () => {});

process.on('SIGINT', () => {
  server.close();
  process.exit();
});

process.on('uncaughtException', function(err) {
  console.log(err.stack);
  throw err;
});
