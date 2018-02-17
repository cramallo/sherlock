var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sherlock' });
});

module.exports = router;
