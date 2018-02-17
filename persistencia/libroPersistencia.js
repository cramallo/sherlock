var db=require('../persistencia/dbconnection');

class libroPersistencia{

    insert(IdLibro, titulo, descripcion, thumbnail, total, callback){
        return db.query("INSERT INTO libro VALUES(?,?,?,?,?)", [IdLibro, titulo, descripcion, thumbnail, total], function(err){
            if(err){
                console.log("[-]" + err.toString());
                return callback(err);
            }
            else{
                console.log("[+]Row successfuly inserted in table libro");
                return callback();
            }
        })
    }
    buscarTodos(){

    }
}
module.exports=libroPersistencia;