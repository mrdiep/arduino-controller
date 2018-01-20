const {
  Router
} = require('express');


const router = Router();

router.get('/', (req, res) => {
  res.sendFile('../../react-ui/build/index.html')
})

export default router;
