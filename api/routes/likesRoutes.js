const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Controllers
const LikesController = require('../controllers/likesController');


router.post('/:postId', LikesController.createLike);

module.exports = router;
