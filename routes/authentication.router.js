const { Router } = require('express');
const router = Router();

const authenticationController = require('../controllers/authentication.controller')

//authentications
router.get('/register', authenticationController.getRegisterPage);
router.post('/register', authenticationController.register);
router.get('/login', authenticationController.getLoginPage);
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);

module.exports = router;