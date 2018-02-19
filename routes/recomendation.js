var express = require('express');
var router = express.Router();
var sherlockInvAndRec=require('../controlador/sistemaSherlockInvAndRec');

/* GET home page. */
router.get('/recomendation', function(req, res, next) {
    var books=sherlockInvAndRec.getBooks();
    res.render('recomendation', {books: books});
});

module.exports = router;
