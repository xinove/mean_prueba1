
var app = angular.module('aMasterizate', ['ngRoute']);

// Configuración de las rutas
app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'pages/home.html',
			controller 	: 'mainController'
		})
		.when('/login', {
			templateUrl : 'pages/login.html',
			controller 	: 'loginController'
		})
		.when('/prueba', {
			templateUrl : 'pages/prueba.html',
			controller 	: 'pruebaController'
		})
		.otherwise({
			redirectTo: '/'
		});
});


app.controller('mainController', function($scope) {
	$scope.message = 'Hola, Mundo!';
});

app.controller('loginController', function($scope) {
	$scope.message = 'Esta es la página "Acerca de"';
});

app.controller('contactController', function($scope) {
	$scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});

app.controller('pruebaController', function($scope, $http) {
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
	