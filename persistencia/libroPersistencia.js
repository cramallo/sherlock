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
}
module.exports=libroPersistencia;