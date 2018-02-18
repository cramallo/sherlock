
class edicion{

    constructor(ISBN) {
        this._ISBN=ISBN;
        this._demandas=[];
        this._publicacionesEdic=[];
        // edicionPersistencia.insert(this);
    }


    get_ISBN() {
        return this._ISBN;
    }

    set_demandas(value){
        this._demandas=value;
    }

    add_demanda(value){
        this._demandas.push(value);
    }

    get_demandas(){
        return this._demandas;
    }

    sosISBN(value){
        return this._ISBN===value;
    }
    
    estasPersistente(value){
        edicionPersistencia.buscarISBN(value, function (boolean) {

        })
    }

    set_publicacionesEdic(value){
        this._publicacionesEdic=value;
    }

    add_publicacionesEdic(value){
        this._publicacionesEdic.push(value);
    }

    get_publicacionesEdic(){
        return this._publicacionesEdic;
    }

}
module.exports=edicion;