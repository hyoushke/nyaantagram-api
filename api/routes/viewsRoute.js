const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');

//Controllers
const ViewsController = require('../controllers/viewsController');


router.post('/', ViewsController.createView);

router.get('/', ViewsController.listViews);
router.get('/:viewsId', ViewsController.getViews);


module.exports = router;