class libro{

    constructor(ID, titulo, descripcion, thumbnail) {
        this._ID=ID;
        this._titulo=titulo;
        this._descripcion=descripcion;
        this._thumbnail=thumbnail;
        //this._total=total; ???
        this._ediciones=[];
        this._demandas=[];
    }


    get_ID() {
        return this._ID;
    }

    set_ID(value) {
        this._ID = value;
    }

    get_titulo() {
        return this._titulo;
    }

    set_titulo(value) {
        this._titulo = value;
    }

    get_descripcion() {
        return this._descripcion;
    }

    set_descripcion(value) {
        this._descripcion = value;
    }

    get_thumbnail() {
        return this._thumbnail;
    }

    set_thumbnail(value) {
        this._thumbnail = value;
    }

    get_ISBNs() {
        return this._ediciones;
    }

    set_ISBNs(value) {
        this._ediciones = value;
    }

    add_ISBNs(value){
        this._ediciones.push(value);
    }

    set_demandas(value){
        this._demandas=value
    }

    add_demanda(value){
        this._demandas.push(demanda);
    }

    get_demandas(){
        return this._demandas;
    }

    sosLibro(value){
        return this._ID=value;
    }
}

module.exports=libro;