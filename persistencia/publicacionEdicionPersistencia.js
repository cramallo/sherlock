var db=require('../persistencia/dbconnection');

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
}
module.exports=publicacionEdicionPersistencia;