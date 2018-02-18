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
var sherlock=require('../controlador/sistemaSherlock');

/* GET home page. */
// console.log("Getting all rows from libro");
// admPersistLib.getAll(function(res){
//     console.log(res);
// })

sherlock.getData();
// console.log("Up and running :)!");
// var i = new Date().getMilliseconds();
// var price=Math.floor((Math.random() * 1000) + 100);
// var ventas=Math.floor((Math.random() * 1000) + 100);
// var ventasAFecha=Math.floor((Math.random() * 1000) + 100);
// console.log("STEP 1: INSERT IN libro");
// admPersistLib.insert(i+1, "IT", "Re piola", 'http://books.google.com/books/content?id=HK-gnkponNIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 13.37, function(res){
//     console.log("STEP 2: INSERT IN edicion");
//     admPersistEdic.insert("150117546" + (i+1).toString(), i+1, function(res){
//         console.log("STEP 3: INSERT IN publicacionedicion");
//         admPersistPubliEdicion.insert(i+1, price, fecha=new Date(), ventas, "150117546" + (i+1).toString(), function(res){
//             console.log("STEP 4: INSERT IN demandaedic");
//             admPersistDemEdic.insert(ventasAFecha, fechaAnalisis = new Date(), "150117546" + (i+1).toString(), function(res){
//                 console.log("[+]Procedure executed successfully");
//             });
//         });
//     });
// });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sherlock' });
});

module.exports = router;
