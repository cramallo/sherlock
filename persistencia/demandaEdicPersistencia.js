var db=require('../persistencia/dbconnection');

class demandaEdicPersistencia{

    insert(ventasAFecha, fechaAnalisis, ISBN, callback){
        return db.query("INSERT INTO demandaedic VALUES(?,?,?,?)", [this.selectLastId()+1, ventasAFecha, fechaAnalisis, ISBN], function(err){
            if(err){
                console.log("[-]DEMANDAEDIC " + err.toString());
                return callback(err);
            }
            else{
                console.log("[+]Row successfuly inserted in table demandaedic");
                return callback();
            }
        })
    }
    selectLastId(callback){
        return db.query("SELECT ID FROM demandaedic ORDER BY ID DESC LIMIT 1", function(err, row){
            if(err){
                console.log("[-]" + err.toString());
                return callback(err);
            }
            else if(!row.lenght){
                console.log("[+] There's no last ID in the table!");
                return callback(null, row.lenght);
            }
            else{
                console.log("[+] Last ID from demandaedic was fetched correctly!");
                return callback(null, row[0]);
            }
        });
    }
    selectLastId2(){
        return db.query("SELECT ID FROM demandaedic", function(err, row){
            return row.length;
        });
    }
    buscarTodos(){

    }
}
module.exports=demandaEdicPersistencia;