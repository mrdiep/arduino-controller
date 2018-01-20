const {
  Router
} = require('express');

import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../react-ui/build/index.html'));
})

export default router;
