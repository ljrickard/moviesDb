// defining the app module of the project
angular.module('moviesDBApp', [
	'ngRoute',
	'movieDBControllers', // container of controllers
	'modalModule',
	'movieDBDirectives',
	'movieDBServices'
	])
.constant("myMovieConfig", {
        "moviesEndpoint" : "https://api.themoviedb.org/3/movie",
        "apiKey": "778083a2f93090ad5fc8e4f1aeac745f"
    })
.config(function($routeProvider) {
		 
		$routeProvider
		  .when('/upcoming', {
		  	templateUrl: 'templates/movies.html',
			controller: 'MovieUpcomingController'
		  })
		  .otherwise({redirectTo: '/upcoming'}); 
	});


var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);