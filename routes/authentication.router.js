const { Router } = require('express');
const router = Router();

const authenticationController = require('../controllers/authentication.controller')
const authMiddleware = require('../middlewares/authentication.middleware')

//authentications
router.get('/register', authenticationController.getRegisterPage);
router.post('/register', authenticationController.register);
router.get('/login', authenticationController.getLoginPage);
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);
router.get('/user/:userId', authenticationController.userInfo);

module.exports = router;