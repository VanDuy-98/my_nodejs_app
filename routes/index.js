var express = require('express');
var router = express.Router();
const authenticateToken = require('../middlewares/authentication.middleware')

/* GET home page. */
router.get('/', authenticateToken.authenticateToken, function(req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

module.exports = router;
