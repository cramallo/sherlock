var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');

/* GET home page. */
router.get('/recomendacion', function(req, res, next) {
    res.render('test', { title: 'Recomendacion'});
});

module.exports = router;
