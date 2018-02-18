var meli = require('mercadolibre');
var edicion=require('../model/edicion');
var condicion=require('../model/condicion');
var libro=require('../model/libro');
var demanda=require('../model/demanda');
var publicacionUsuario=require('../model/publicacionUsuario');
var publicacionEdicion=require('../model/publicacionEdicion');

var libroPersistencia=require('../persistencia/libroPersistencia');
var condicionPersistencia=require('../persistencia/condicionPersistencia');
var demandaPersistencia=require('../persistencia/demandaPersistencia');
var edicionPersistencia=require('../persistencia/edicionPersistencia');
var PublicacionUsuarioPersistencia=require('../persistencia/publicacionUsuarioPersistencia');
var publicacionEdicionPersistencia=require('../persistencia/publicacionEdicionPersistencia');
var request = require('request');


var sistemaSherlock= (function () {

    var condiciones = []
    var publicacionUsuarios = []
    var libros = []
    var publicacionEdiciones = []
    var condicionPers=new condicionPersistencia();
    var demandaPers=new demandaPersistencia();
    var edicionPers=new edicionPersistencia();
    var pubUsuarioPers=new PublicacionUsuarioPersistencia();
    var pubEdicionPers=new publicacionEdicionPersistencia();
    var libroPers=new libroPersistencia();

    (function ()
    {
        libroPers.getAll(function (err, books) {
            if(err)
                return;
            else{
                if(books.length){
                    return libros=books;
                }
                else{
                    return;
                }
            }
        })
        //SELECT todos los libros y publicaciones
    })();

    function searchEdicion(ISBN){
        //buscar si existe ese ISBN en el array de ediciones
        //si no lo encuentra lo busca en la db con edicionpersistencia.search
    }

    function bookExist(id, callback) {
        for(let i=0;i<libros.length;i++){
            if(libros[i].sosLibro(id)){
                return callback(null, true);
            }
        }

        libroPers.exist(id, function (err, flag) {
            return callback(err, flag);
        })
    }

    function createBook(data, finalID, title, description,thumbnail, callback){

    }

    function callback_gBooks(error, response, body) {
        var data = JSON.parse(body)
        if(response.statusCode != 200){
            console.log("error: ", error)
        }else if (data['totalItems'] == 0){
            console.log("no items found")
        }else{
            //TODO: Este else deberia ser una funcion aparte llamada createBook(parametros);
            var description = data['items'][0]['volumeInfo']['description']
            var thumbnail = data['items'][0]['volumeInfo']['imageLinks']['thumbnail']
            let verified=0;
            let finalID='';
            for (var i = 0; i < 5; i++){
                //verificar si esta en la base cada id en libros
                let existAux=false;
                bookExist(data['items'][i]['id'],function (err, flag) {
                    verified++;
                    if(err){
                        //algo
                    }
                    else if(flag===true)
                    //descartamos la carga del nuevo libro
                        existAux=true;
                    else
                        finalID+=data['items'][verified-1]['id']+'_';
                    //verificamos si se terminaron de buscar todos los id y todos dieron falso.
                    if(verified===5 && existAux===false){
                        //En caso de que no exista creamos el libro con el ID de finalID y el titulo de la busqeuda
                        let unLibro = new libro(finalID, title, description,thumbnail);
                        //TODO: no podemos seguir porque falta ISBN y titulo extraido de la publicacion
                        libros.push(unLibro);
                        //TODO: hay que analizar donde hacemos el push en la DB;
                        console.log("[+] Nuevo libro: ",libros[0])
                    }
                })
            }

        }
        return 1
    }

    return{
        getData : function(){
            var meliObject = new  meli.Meli(384959678157016,'iYowbeD27vdRsVMZbq5o3rTfJ1OdRm7s')
            meliObject.get('sites/MLA/search?category=MLA5684&condition=new&limit=10', function (err, res) {
                //IGNORAR SI TIENE LA PALABRA PACK TODO
                var id = res['results'][9]['id'] //MLA695429669
                meliObject.get('items/'+id, function (err, res) {
                    var title = ""
                    //llamar a la api de google
                    var atts = res['attributes'];
                    atts.forEach(function(att){
                        if (att['id'] == 'ISBN'){
                            var ISBN = att['value_name']
                        }
                        if (att['id'] == 'BOOK_TITLE'){
                            title = att['value_name']
                        }
                    })
                    var titleToSearch = title.replace(new RegExp(" ", 'g'),"-")
                    if (titleToSearch){
                        request('https://www.googleapis.com/books/v1/volumes?q='+title,callback_gBooks)
                    }
                })
            })
        },

        getBooks(){
          return libros;
        }

    }

})();



module.exports = sistemaSherlock;