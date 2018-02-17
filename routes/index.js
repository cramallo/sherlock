var express = require('express');
var router = express.Router();
var admPersistPublicacionEdicion = require('../persistencia/publicacionEdicionPersistencia');
var admPersistPubliEdicion = new admPersistPublicacionEdicion();
var admPersistEdicion = require('../persistencia/edicionPersistencia');
var admPersistEdic = new admPersistEdicion();
var admPersistLibro = require('../persistencia/libroPersistencia');
var admPersistLib = new admPersistLibro();
var admPersistDemandaEdicion = require('../persistencia/demandaEdicPersistencia');
var admPersistDemEdic = new admPersistDemandaEdicion();

/* GET home page. */
console.log("Up and running :)!");
var i = new Date().getMilliseconds();
console.log("STEP 1: INSERT IN libro");
admPersistLib.insert(i+1, "IT", "Re piola", 1234, 13.37, function(res){
    console.log("STEP 2: INSERT IN edicion");
    admPersistEdic.insert("150117546" + (i+1).toString(), i+1, function(res){
        console.log("STEP 3: INSERT IN publicacionedicion");
        admPersistPubliEdicion.insert(i+1, 13.37, fecha = new Date(), 999, "1501175467", function(res){
            console.log("STEP 4: INSERT IN demandaedic");
            admPersistDemEdic.insert(1, fechaAnalisis = new Date(), "150117546" + (i+1).toString(), function(res){
                console.log("[+]Procedure executed successfully");
            });
        });
    });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: ISBN.get_ID() });
});

module.exports = router;
