//crearemos un modulo que será el que defina toda nuestra aplicación
var app = angular.module('angularTodo', []);  


app.controller('mainController', function($scope, $http) {
    $scope.formData = {};
    // Cuando se cargue la página, pide del API todos los TODOs
    $http.get('/api/todos')
        .success(function(data) {
            $scope.usuarios = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo TODO, manda el texto a la API
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra un TODO despues de checkearlo como acabado
    $scope.delTodo = function(id) {
        $http.del('/api/todos/' + id)
            .success(function(data) {
                $scope.usuarios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});
	 
app.controller('Ctrl2', function($scope, $routeParams) {
  $scope.message = 'PersonId = ' + $routeParams.personId;
});