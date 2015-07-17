//crearemos un modulo que será el que defina toda nuestra aplicación
var app = angular.module('angularTodo', []);  

app.controller('mainController', function($scope, $http) {
    $scope.formData = {};
    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/todos')
        .success(function(data) {
            $scope.usuarios = data;
            //$log.log(JSON.stringify(data));
        })
        .error(function(data) {
        	//$log.log(JSON.stringify('Error:' + data));
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.usuarios = data;
                //$log.log(JSON.stringify(data));
            })
            .error(function(data) {
            	//$log.log(JSON.stringify('Error:' + data));
            });
    };
    
    // Borra un TODO despues de checkearlo como acabado
    $scope.delTodo = function(id) {
    	$http.delete('/api/todos/' + id).success(function(data) {
            $scope.usuarios = data;
            //$log.log(JSON.stringify(data));
        }).error(function(data) {
        		//$log.log('Error:' + data);
            });
    };
});
	 
  app.controller('login', function($scope, $http) {
  $scope.message = 'PersonId = ' + $http.usuario;
  
  //Nos vamos al formulario para crear 
  $scope.createNewUser = function(){
     /* $http.post('/users', $scope.formData)
          .success(function(data) {
             // $scope.formData = {};
              //$scope.usuarios = data;
        	  //$log.log(JSON.stringify(data));
          })
          .error(function(data) {
              //console.log('Error:' + data);
          });*/
      $http.get('/users')
      .success(function(data) {
          //$scope.usuarios = data;
          //console.log(data)
      })
      .error(function(data) {
          //console.log('Error: ' + data);
      });
  };
  
//Cuando se cargue la página, pide del API todos los Usuarios? no, no necesitas nada!
 
});