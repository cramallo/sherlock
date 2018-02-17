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

    exist(id, callback){
        return db.query('SELECT ID FROM `libro` WHERE ID LIKE \'%?%\'',[id],function (err, res) {
            if(err){
                console.log("[-]" + err.toString());
                return callback(err);
            }
            else if(res.length){
                console.log("[+]ID "+res[0]+' finded');
                return callback(null, true);
            }
            else{
                console.log("[+]ID "+id+' not finded');
                return callback(null, false);
            }
        })
    }
}
module.exports=libroPersistencia;