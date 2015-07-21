
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var mongoose     = require('mongoose');

//Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/prueba');

//Configuración
app.configure(function() {
    // Localización de los ficheros estáticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev')); 
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride()); 
    //Tonteria del icono
    app.use(express.favicon());   
    
    //Las vistas...
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    //Aun no se para que se utiliza este fichero de router
    //app.use(app.router);
});

//Definimos el modelo de BD Mongodb
var Todo = mongoose.model('Usuario', {
    nombre: String, 
    login: String
});

/*Rutas de la web API*/ 
//GET de todos los TODOs
app.get('/api/todos', function(req, res) {                
 Todo.find(function(err, nombre) {
     if(err) {
         res.send(err);
     }
     res.json(nombre);
 });
});

//POST que crea un TODO y devuelve todos tras la creación
app.post('/api/todos', function(req, res) {                
 Todo.create({
	 nombre: req.body.text,
     done: false
 }, function(err, nombre){
     if(err) {
         res.send(err);
     }

     Todo.find(function(err, nombre) {
         if(err){
             res.send(err);
         }
         res.json(nombre);
     });
 });
});

//DELETE un TODO específico y devuelve todos tras borrarlo.
app.del('/api/todos/:usuario', function(req, res) {        
 Todo.remove({
     _id: req.params.usuario
 }, function(err, usuario) {
     if(err){
         res.send(err);
     }

     Todo.find(function(err, usuarios) {
         if(err){
             res.send(err);
         }
         res.json(usuarios);
     });

 })
});

//Carga una vista HTML simple donde irá nuestra Single App Page
//Angular Manejará el Frontend
app.get('/', function(req, res) {                        
 res.sendfile('./public/index.html');                
});

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
    console.log('App listening on port 8088');
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});