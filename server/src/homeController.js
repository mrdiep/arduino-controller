const {
  Router
} = require('express');

import path from 'path';

export default function homeRouter(socketIO) {
  return () => {
    const router = Router();

    router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../react-ui/build/index.html'));
    })

    router.post('/control', (req, res) => {
      var requestModel = req.body;
      socketIO
      console.log(requestModel);
    })

    return router;
  }
};
