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
    buscarTodos(){

    }
}
module.exports=publicacionEdicionPersistencia;