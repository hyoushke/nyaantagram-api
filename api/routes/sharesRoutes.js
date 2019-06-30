const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');

//Controllers
const SharesController = require('../controllers/sharesController');


router.post('/', SharesController.createShare);

router.get('/', SharesController.listShare);
router.get('/:postId', SharesController.getShare);


module.exports = router;