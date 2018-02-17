class condicion{

    constructor(condicion) {
        this._condicion=condicion;
    }


    get_condicion() {
        return this._condicion;
    }

    set_condicion(value) {
        this._condicion = value;
    }

    sosLaCondicion(value){
        return this._condicion===value;
    }
}
module.exports=condicion;