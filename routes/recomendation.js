var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');
var libroPersistencia=require('../persistencia/libroPersistencia');
var libroPers=new libroPersistencia();

/* GET home page. */
router.get('/recomendation', function(req, res, next) {
    libroPers.getAll(function (books) {
        console.log(books);
        res.render('recomendation', { books: books});
    })
});

module.exports = router;
