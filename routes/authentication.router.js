const { Router } = require('express');
const router = Router();

const authenticationController = require('../controllers/authentication.controller')

//authentications
router.get('/login', authenticationController.getLoginPage);
router.post('/login', authenticationController.login);
router.get('/logout', authenticationController.logout);

module.exports = router;