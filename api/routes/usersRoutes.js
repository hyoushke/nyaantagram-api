const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');

const UsersController = require('../controllers/usersController');

router.post('/register', UsersController.createUser);
router.post('/login', UsersController.loginUser);
router.post('/logout', UsersController.logoutUser);
//router.post('/resetpassword', UsersController.resetpasswordUser);
//router.post('/activate', UsersController.activateUser);

//router.delete('/:userId', UsersController.removeUser);
//router.patch('/:userId', UsersController.updateUser );
//router.get('/:userId', UsersController.getUser );

//router.get('/', UsersController.listUsers);

module.exports = router;


