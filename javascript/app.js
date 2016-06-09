// defining the app module of the project
angular.module('moviesDBApp', [
	'ngRoute',
	'movieDBControllers', // container of controllers
	'movieDBDirectives',
	'movieDBServices'
	])
.constant("myMovieConfig", {
        "moviesEndpoint" : "https://api.themoviedb.org/3/movie",
        "apiKey": "778083a2f93090ad5fc8e4f1aeac745f"
    })
.config(function($routeProvider) {
		 
		$routeProvider
		  .when('/popular', {
		  	templateUrl: 'templates/movies.html',
		  	controller: 'MovieListController'
		  })
		  .when('/upcoming', {
		  	templateUrl: 'templates/movies.html',
			controller: 'MovieUpcomingController'
		  })
		  .when('/topRated', {
		  	templateUrl: 'templates/movies.html',
			controller: 'MovieTopRatedController'
		  })
		  .when("/nowPlaying", {
			templateUrl: "templates/movies.html",
			controller: "MovieNowPlayingController"
		})
		 .when("/movie/:movieId", {
			templateUrl: 'templates/movie-detail.html',
			controller: "MovieDetailsController"
		})
		  .otherwise({redirectTo: '/popular'}); 
	});