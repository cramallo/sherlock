var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');
var meli = require('mercadolibre');

/* GET home page. */
router.get('/investigate', function(req, res, next) {
    console.log("asdasd")
    res.render('index', { title: 'Express'});
});

module.exports = router;
