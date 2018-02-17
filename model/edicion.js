
class edicion{

    constructor(ISBN) {
        this._ISBN=ISBN;
        this._demandas=[];
        // ISBNPersistencia.insert(this);
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
        ISBNPersistencia.buscarISBN(value, function (boolean) {

        })
    }


}
module.exports=edicion;