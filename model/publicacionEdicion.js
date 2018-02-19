class publicacionEdicion{

    constructor(ID, precio, fecha, ventas) {
        this._ID=ID;
        this._precio=precio;
        this._fecha=fecha;
        this._ventas=ventas;
        // this._edicion=edicion;
    }


    get_ID() {
        return this._ID;
    }

    set_ID(value) {
        this._ID = value;
    }

    get_precio() {
        return this._precio;
    }

    set_precio(value) {
        this._precio = value;
    }

    get_fecha() {
        return this._fecha;
    }

    set_fecha(value) {
        this._fecha = value;
    }

    get_ventas() {
        return this._ventas;
    }

    set_ventas(value) {
        this._ventas = value;
    }
    //
    //
    // get_edicion() {
    //     return this._edicion;
    // }
    //
    // set_edicion(value) {
    //     this._edicion = value;
    // }
}
module.exports=publicacionEdicion