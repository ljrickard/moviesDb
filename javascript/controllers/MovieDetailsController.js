angular.module('movieDBControllers')
    .controller('MovieDetailsController', function($scope, $routeParams, MovieService, myMovieConfig) {

        $scope.loading = true;
        $scope.title = 'Movie Details';
        $scope.id = $routeParams.movieId;
        var movieDetailsUrl = myMovieConfig.moviesEndpoint + '/' + $routeParams.movieId + '?api_key=' + myMovieConfig.apiKey + '&append_to_response=releases,trailers';
        MovieService.getList(movieDetailsUrl).then(
            function(result) {
                $scope.moveDetails = result.data; /*res.filter(function(val){return val !== null});;*/
                $scope.loading = false;
            }
        ).catch(
            function(error) {
                console.log('error', error)
            });

        // function getDirector(result) {
        // 	$scope.movieDetails = result.data;
        //   var data = result.data.crew;
        //   var filteredData = data.filter(function(obj) {
        //       return obj.job == 'Director';
        //   });

        //   $scope.director = filteredData[0].name;
        //   return result;
        // }

        var movieCreditsUrl = myMovieConfig.moviesEndpoint + '/' + $routeParams.movieId + '/credits' + '?api_key=' + myMovieConfig.apiKey;
        
        MovieService.getList(movieCreditsUrl).then(
          	function(result){
          	$scope.movieDetails = result.data;
          	// getDirector(result);
          }
      ).catch(
        function(error) {
            console.log('error', error)
        });
    });


