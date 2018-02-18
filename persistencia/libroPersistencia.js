var db=require('../persistencia/dbconnection');
var libro=require('../model/libro');
var edicionPersistencia=require('../persistencia/edicionPersistencia');
var edicPers=new edicionPersistencia();

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

    getAll(callback){
        //Hay un bug en getEditionsByBook, devuelve 2 iguales.
        return db.query("SELECT * FROM libro", function(err, rows){
            if(err){
                console.log("[-]GETALL [Libro]" + err);
                return callback(err);
            }

            else{
                if(rows.length){
                    console.log("[+] All rows from libro were selected!")
                    var books=[];
                    let done=0;
                    let finishCondition=rows.length;
                    for(let i=0;i<rows.length;i++){
                        let book=new libro(rows[i].ID, rows[i].titulo, rows[i].descripcion, rows[i].thumbnail);
                        edicPers.getEditionsByBook(book, function (err, res, book) {
                            if(err)
                                return callback(console.log('[-] '+err));
                            else{
                                done++;
                                if(res.length){
                                    for(let j=0;j<res.length;j++){
                                        book.add_ISBNs(res[j]);
                                    }
                                    books.push(book)
                                    if(done===finishCondition){
                                        return callback(null, books);
                                    }
                                }
                                if(done===finishCondition){
                                    return callback(null, books);
                                }
                            }

                        })
                    }
                }
                else{
                    console.log("[+] Not exist rows from libro!")
                    return callback();
                }
            }
        });
    }

    exist(id, callback){
        return db.query("SELECT ID FROM libro WHERE ID LIKE '%"+id+"%'",function (err, res) {
            if(err){
                console.log("[-]" + err.toString());
                return callback(err);
            }
            else if(res.length){
                console.log("[+]ID "+res[0]+' finded');
                return callback(null, true);
            }
            else{
                return callback(null, false);
            }
        })
    }
}
module.exports=libroPersistencia;