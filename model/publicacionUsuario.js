class publicacionUsuario{

    constructor(ID, titulo) {
        this._ID=ID;
        this._titulo=titulo;
        this._condiciones=[];
        this._demandas=[];
    }


    get_ID() {
        return this._ID;
    }

    get_titulo() {
        return this._titulo;
    }

    set_titulo(value) {
        this._titulo = value;
    }

    get_condiciones() {
        return this._condiciones;
    }

    add_condicion(value) {
        this._condiciones.push(value);
    }

    set_condiciones(value){
        this._condiciones=value;
    }

    get_demandas() {
        return this._demandas;
    }

    add_demanda(value) {
        this._demandas.push(value)
    }

    set_demandas(value){
        this._demandas=value;
    }

    sosPublicacionUsuario(value){
        return this._ID===value;
    }
}

module.exports=publicacionUsuario;