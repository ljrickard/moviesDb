angular.module('movieDBControllers')
    .controller('MovieTopRatedController', function($scope, MovieService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Top Rated Movies'
        var url = myMovieConfig.moviesEndpoint + '/top_rated?api_key=' + myMovieConfig.apiKey;
        MovieService.getList(url).then(
            function(result) {
                $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
                $scope.loading = false;
            }
        ).catch(
            function(error) {
                console.log('error', error)
            });
    });