var express = require('express');
var router = express.Router();
var sherlock=require('../controlador/sistemaSherlock');


/* GET home page. */
router.get('/investigate', function(req, res, next) {
    sherlock.getData()
    res.render('test', { title: 'Investigate'});
});

module.exports = router;
