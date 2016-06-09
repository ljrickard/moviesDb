angular
  .module('movieDBDirectives',[])
    .directive('movieInfoBox', function() {
      return {
        restrict: 'E',    // usage of the directive: E -> element
        scope: {
          movie: '=info'    // 'movie' set with the 'info' attribute
        },
        templateUrl: 'templates/directives/movie-info-box.html'
      };
    })
    .controller('movieNavController',function( $scope ) {
      $scope.title = "Movies Super Catalog";
    })
    .directive('movieNav', function() {
      return {
        restrict: 'E',    // usage of the directive: E -> element
        templateUrl: 'templates/directives/movie-nav.html',
        controller: 'movieNavController'
      };
    });