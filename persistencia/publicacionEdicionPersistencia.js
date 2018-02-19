var db=require('../persistencia/dbconnection');
var pubEdic=require('../model/publicacionEdicion');

class publicacionEdicionPersistencia{

    insert(id, precio, fecha, ventas, ISBN, callback){
        return db.query("INSERT INTO publicacionedicion VALUES(?,?,?,?,?)", [id, precio, fecha, ventas, ISBN], function(err){
            if(err){
                console.log("[-]" + err.toString());
                return callback(err);
            }
            else{
                console.log("[+]Row successfuly inserted in table publicacionEdicion!");
                return callback();
            }
        })
    }
    getAll(callback){
        return db.query("SELECT * FROM publicacionedicion", function(err, row){
            if(err){
                console.log("[-]GETALL [PublicacionEdicion]" + err);
                return callback(err);
            }
            else{
                console.log("[+] All rows from publicacionedicion were selected!")
                return callback(row[0]);
            }
        });
    }

    getPubsEdicByEdic(edicion, callback){
        return db.query('SELECT * FROM `publicacionedicion` WHERE `ISBN`=?',[edicion.get_ISBN()],function (err, rows) {
            if(err)
                return callback(err);
            else{
                var pubsEdic=[];
                if(rows.length){
                    console.log("[+] All rows from publicacionedicion were selected!")
                    for(let i=0;i<rows.length;i++){
                        let pubedic=new pubEdic(rows[i].ID,rows[i].precio,rows[i].fecha,rows[i].ventas);
                        pubsEdic.push(pubedic);
                    }
                    return callback(null, pubsEdic, edicion);
                }
                else{
                    return callback(null, pubsEdic, edicion);
                }
            }
        })
    }
}
module.exports=publicacionEdicionPersistencia;