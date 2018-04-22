var db=require('../persistencia/dbconnection');
var demandaEdicPersistencia=require('../persistencia/demandaEdicPersistencia');
var demandaEdicPers=new demandaEdicPersistencia();
var Edicion=require('../model/edicion');
var publicacionEdicionPersistencia=require('../persistencia/publicacionEdicionPersistencia');
var pubEdicPers=new publicacionEdicionPersistencia();

class edicionPersistencia{

    insert(ISBN, IdLibro, callback){
        return db.query("INSERT INTO edicion VALUES(?, ?)", [ISBN, IdLibro], function(err){
            if(err){
                console.log("[-] edicion" + err.toString());
            }
            else{
                console.log("[+]Row successfuly inserted in table edicion");
            }
        })
    }
    getAll(callback){
        return db.query("SELECT * FROM libro", function(err, row){
            if(err){
                console.log("[-]GETALL [Libro]" + err);
                return callback(err);
            }
            else{
                console.log("[+] All rows from libro were selected!")
                return callback(row[0]);
            }
        });
    }
    getEditionsByBook(book, callback){
        return db.query("SELECT * FROM `edicion` WHERE edicion.IDlibro=?",[book.get_ID()], function (err, rows) {
            if(err)
                return callback(err);
            else{
                console.log()
                var ediciones=[];
                if(rows.length){
                    console.log("[+] All rows from edicion were selected!")
                    let doneDemandas=0;
                    let donePubsEdic=0;
                    let finishCondition=rows.length;
                    for(let i=0;i<rows.length;i++){
                        let edicion=new Edicion(rows[i].ISBN);
                        demandaEdicPers.getDemandasEdicByEdic(edicion, function (err, rowsDemanda, edicion) {
                            if(err)
                                return callback(err);
                            else{
                                doneDemandas++;
                                if(rowsDemanda.length){
                                    for(let j=0;j<rowsDemanda.length;j++){
                                        edicion.add_demanda(rowsDemanda[j]);
                                    }
                                    //TODO: ver si esto esta bien porque pusheamos 2 veces
                                    ediciones.push(edicion);
                                    if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                        return callback(null, ediciones, book);
                                }
                                else{
                                    if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                        return callback(null, ediciones, book);
                                }

                            }
                        })
                        pubEdicPers.getPubsEdicByEdic(edicion, function (err, rowsPubEdic, edicion) {
                            if(err)
                                return callback(err);
                            else{
                                donePubsEdic++;
                                if(rowsPubEdic.length){
                                    for(let j=0;j<rowsPubEdic.length;j++){
                                        edicion.add_publicacionesEdic(rowsPubEdic[j]);
                                    }
                                    //TODO: ver si esto esta bien
                                    ediciones.push(edicion);
                                    if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                        return callback(null, ediciones, book);
                                }
                                else{
                                    if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                        return callback(null, ediciones, book);
                                }

                            }
                        })
                    }
                }
                else{
                    return callback(null, ediciones, book);
                }
            }
        })
    }


    getISBN(ISBN, callback){
        return db.query("SELECT * FROM `edicion` WHERE edicion.ISBN=?",[ISBN], function (err, rows) {
            if(err)
                return callback(err);
            else{
                console.log()
                var ediciones=[];
                if(rows.length){
                    console.log("[+] All rows with ISBN="+ISBN+"from edicion were selected!")
                    let doneDemandas=0;
                    let donePubsEdic=0;
                    let finishCondition=rows.length;
                    let edicion=new Edicion(rows[0].ISBN);
                    demandaEdicPers.getDemandasEdicByEdic(edicion, function (err, rowsDemanda, edicion) {
                        if(err)
                            return callback(err);
                        else{
                            doneDemandas++;
                            if(rowsDemanda.length){
                                for(let j=0;j<rowsDemanda.length;j++){
                                    edicion.add_demanda(rowsDemanda[j]);
                                }
                                if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                    return callback(null, edicion);
                            }
                            else{
                                if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                    return callback(null, edicion);
                            }

                        }
                    })
                    pubEdicPers.getPubsEdicByEdic(edicion, function (err, rowsPubEdic, edicion) {
                        if(err)
                            return callback(err);
                        else{
                            donePubsEdic++;
                            if(rowsPubEdic.length){
                                for(let j=0;j<rowsPubEdic.length;j++){
                                    edicion.add_publicacionesEdic(rowsPubEdic[j]);
                                }
                                if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                    return callback(null, edicion);
                            }
                            else{
                                if(doneDemandas===finishCondition && donePubsEdic===finishCondition)
                                    return callback(null, edicion);
                            }

                        }
                    })
                }
                else{
                    return callback(null, null);
                }
            }
        })
    }
}

module.exports=edicionPersistencia;