var db=require('../persistencia/dbconnection');
class EdicionPersistencia{
    insert(ISBN){
        db.query('INSERT INTO `isbn`(`ISBN`, `precioProveedor`, `precioAPromediar`, `precioMasBajo`, `contador`) VALUES (?,?,?,?,?)',[ISBN.get_ISBN(),ISBN.get_precioProveedor(),ISBN.get_precioAPromediar(),ISBN.get_precioMasBajo(),ISBN.get_contadot()],callback);
    }
    buscarTodos(){

    }
}
module.exports=EdicionPersistencia;