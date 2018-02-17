class demanda{
    constructor(ventasAFecha) {
        this._ID=demanda.incrementarID();
        this._ventasAFecha=ventasAFecha;
        this._fechaAnalisis=new Date();
    }


    get_ventasAFecha() {
        return this._ventasAFecha;
    }

    set_ventasAFecha(value) {
        this._ventasAFecha = value;
    }

    get_fechaAnalisis() {
        return this._fechaAnalisis;
    }

    set_fechaAnalisis(value) {
        this._fechaAnalisis = value;
    }

    static incrementarID() {
        if (!this.ultimoID)
            this.ultimoID = 1;
        else
            ++this.ultimoID;
        return this.ultimoID;
    }

    sosLaDemanda(value){
        return this._ID=value;
    }
}

module.exports=demanda;