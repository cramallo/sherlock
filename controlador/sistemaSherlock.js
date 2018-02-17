var edicion=require('../model/edicion');
var condicion=require('../model/condicion');
var libro=require('../model/libro');
var demanda=require('../model/demanda');
var publicacionUsuario=require('../model/publicacionUsuario');
var publicacionEdicion=require('../model/publicacionEdicion');

var libroPersistencia=require('../persistencia/libroPersistencia');
var condicionPersistencia=require('../persistencia/condicionPersistencia');
var demandaPersistencia=require('../persistencia/demandaPersistencia');
var edicionPersistencia=require('../persistencia/edicionPersistencia');
var PublicacionUsuarioPersistencia=require('../persistencia/publicacionUsuarioPersistencia');
var publicacionEdicionPersistencia=require('../persistencia/publicacionEdicionPersistencia');

class sherlock{

    constructor() {
        this._ediciones=[];
        this._condiciones=[];
        this._libros=[];
        this._demandas=[];
        this._publicacionesUsuario=[];
        this._publicacionesEdicion=[];
    }
}

module.exports=sherlock;