var db=require('../persistencia/dbconnection');

class edicionPersistencia{

    insert(ISBN, IdLibro, callback){
        return db.query("INSERT INTO edicion VALUES(?, ?)", [ISBN, IdLibro], function(err){
            if(err){
                console.log("[-]" + err.toString());
                return callback(err);
            }
            else{
                console.log("[+]Row successfuly inserted in table edicion");
                return callback();
            }
        })
    }
    buscarTodos(){

    }
}

module.exports=edicionPersistencia;