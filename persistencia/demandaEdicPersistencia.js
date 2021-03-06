var db=require('../persistencia/dbconnection');
var demanda=require('../model/demanda');

class demandaEdicPersistencia{

    insert(ventasAFecha, fechaAnalisis, ISBN, callback){
        return db.query("INSERT INTO `demandaedic`(`ventasAFecha`, `fechaAnalisis`, `ISBN`) VALUES (?,?,?)", [ventasAFecha, fechaAnalisis, ISBN], function(err){
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
    getAll(callback){
        return db.query("SELECT * FROM demandaedic", function(err, row){
           if(err){
               console.log("[-]GETALL [DemandaEdic]" + err);
               return callback(err);
           }
           else{
               console.log("[+] All rows from demandaedic were selected!")
               return callback(row[0]);
           }
        });
    }

    getDemandasEdicByEdic(edicion, callback){
        return db.query('SELECT * FROM `demandaedic` WHERE `ISBN`=?',[edicion.get_ISBN()],function (err, rows) {
            if(err)
                return callback(err);
            else{
                var demandas=[];
                if(rows.length){
                    console.log("[+] All rows from demandaedic were selected!")
                    for(let i=0;i<rows.length;i++){
                        let demandaEdic=new demanda(rows[i].ventasAFecha);
                        demandas.push(demandaEdic);
                    }
                    return callback(null, demandas, edicion);
                }
                else{
                    return callback(null, demandas, edicion);
                }
            }
        })
    }
}
module.exports=demandaEdicPersistencia;