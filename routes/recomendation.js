var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');

/* GET home page. */
router.get('/recomendation', function(req, res, next) {
    var books=sherlock.getBooks();
    res.render('recomendation', {books: books});
});

module.exports = router;
