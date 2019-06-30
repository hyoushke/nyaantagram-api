const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Controllers
const CommentsController = require('../controllers/commentsController');


router.post('/', CommentsController.createComment);


module.exports = router;
