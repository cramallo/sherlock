var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');

/* GET home page. */
router.get('/posicionamiento', function(req, res, next) {
    res.render('test', { title: 'Posicion' });
});

module.exports = router;
