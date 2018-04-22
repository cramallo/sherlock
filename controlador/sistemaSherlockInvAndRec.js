var async=require('async')
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


var sistemaSherlockInvAndRec= (function () {

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
            //TODO:──────────────────────LIMITAR, NO TIENE QUE DEVOLVER TODO QUE LLENAMOS MEMORIA;──────────────────────────────
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

    //TODO: PODEMOS HACER FUNCIONES PARA CARGAR EN EL ARRAY Y LA BASE DE DATOS DE UNA
    function saveBook(book) {
        libros.push(book)
        libroPers.insert(book.get_ID(),book.get_titulo(), book.get_descripcion(), book.get_thumbnail())
    }

    function addEdition(book, edicion, flag) {
        book.add_ISBNs(edicion)
        edicionPers.insert(edicion.get_ISBN(),book.get_ID())
    }

    function addPublication(edicion, publicacion){
        edicion.add_publicacionesEdic(publicacion)
        pubEdicionPers.insert(publicacion.get_ID(),publicacion.get_precio(), publicacion.get_fecha(), publicacion.get_ventas(), edicion.get_ISBN())
    }
    
    function searchEdicion(ISBN, callback){
        for(let i=0;i<libros.length;i++){
            let edicion=libros[i].tenesISBN(ISBN)
            if(edicion){
                return callback(null, edicion);
            }
        }

        edicionPers.getISBN(ISBN, function (err, edicion) {
            return callback(err, edicion);
        })
    }

    function bookExist(id, callback) {
        for(let i=0;i<libros.length;i++){
            if(libros[i].sosLibro(id)){
                return callback(null, true, libros[i]);
            }
        }

        libroPers.exist(id, function (err, flag, libro) {
            return callback(err, flag, libro);
        })
    }


    function createBook(error, response, body, atts) {
        var data = JSON.parse(body)
        if(response.statusCode != 200){
            console.error("[-] Error: ", error)
        }else if (data['totalItems'] == 0){
            console.error("[-] No items found")
        }else{
            //TODO: Este else deberia ser una funcion aparte llamada createBook(parametros);
            var description =''
            if(data['items'][0]['volumeInfo']['description'])
                description =data['items'][0]['volumeInfo']['description']
            else
                description='Sin descripcion disponible'
            try{
                var thumbnail = data['items'][0]['volumeInfo']['imageLinks']['thumbnail']
            }
            catch(e){
                var thumbnail = '/img/thumbnail-default.jpg'
            }
            let verified=0;
            let finalID='_';
            for (var i = 0; i < 5; i++){
                //verificar si esta en la base cada id en libros
                let existAux=false;
                bookExist(data['items'][i]['id'],function (err, flag, unLibro) {
                    verified++;
                    if(err){
                        //algo
                    }
                    else if(flag===true){
                    //descartamos la carga del nuevo libro
                        existAux=true;
                    }

                    else
                        finalID+=data['items'][verified-1]['id']+'_';
                    //verificamos si se terminaron de buscar todos los id y todos dieron falso.
                    if(verified===5 && existAux===false){
                        //En caso de que no exista creamos el libro con el ID de finalID y el titulo de la busqeuda
                        unLibro = new libro(finalID, atts['title'], description,thumbnail);
                        //TODO: no podemos seguir porque falta ISBN y titulo extraido de la publicacion
                        //TODO: CREATE EDITION
                        saveBook(unLibro);
                        //TODO: hay que analizar donde hacemos el push en la DB;
                    }
                    if(verified===5){
                        let unaPubli = new publicacionEdicion(atts['id'], atts['price'],atts['sold_qty']);
                        searchEdicion(atts['ISBN'], function (err, laEdicion) {
                            if(err){
                                //algo
                            }
                            else if(!laEdicion){
                                laEdicion= new edicion(atts['ISBN'])
                            }
                            addEdition(unLibro,laEdicion)
                            addPublication(laEdicion,unaPubli)
                            console.log('[+] El libro es: '+unLibro.get_titulo())
                        })
                        publicacionEdiciones.push(unaPubli)
                    }
                })
            }

        }
    }
    return{
        getData : function(){
            var offset=0
            var counter=0
            var vistos=0
            var recursive=true;

            var meliObject = new  meli.Meli(384959678157016,'iYowbeD27vdRsVMZbq5o3rTfJ1OdRm7s')
            for(let i=0;i<20;i++){
                let url='sites/MLA/search?category=MLA5684&condition=new&limit=200&offset='+offset
                meliObject.get(url, function (err, res) {
                    //IGNORAR SI TIENE LA PALABRA PACK TODO
                    vistos++
                    console.error(vistos)
                    try {
                        for (let i = 0; i < res['results'].length; i++) {

                            meliObject.get('items/' + res['results'][i]['id'], function (err, res) {
                                console.log(counter)
                                //llamar a la api de google
                                try {
                                    if (err)
                                        throw new Error(err);
                                    var atts = res['attributes'];
                                    var info = {}
                                    info['price'] = res['base_price']
                                    info['sold_qty'] = res['sold_quantity']
                                    info['id'] = res['id']
                                    atts.forEach(function (att) {
                                        if (att['id'] == 'ISBN') {
                                            counter++;
                                            info['ISBN'] = att['value_name']
                                        }
                                        if (att['id'] == 'BOOK_TITLE') {
                                            info['title'] = att['value_name']
                                        }
                                    })
                                    if (info['ISBN']) {
                                        info['title'] = info['title'].replace(new RegExp(" ", 'g'), "-")
                                        if (info['title']) {
                                            request('https://www.googleapis.com/books/v1/volumes?q=' + info['title'], function (error, response, body) {


                                                info['title'] = info['title'].replace(new RegExp("-", 'g'), " ")
                                                createBook(error, response, body, info)
                                            })
                                        }
                                    }
                                }
                                catch (e) {
                                    console.log(e)
                                    return;
                                }
                            })
                        }
                    }
                    catch (e) {
                        console.log(e)
                        return;
                    }
                })
            }

        },

        getBooks(){
          return libros;
        }
    }
})();

module.exports = sistemaSherlockInvAndRec;