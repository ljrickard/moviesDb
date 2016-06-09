angular.module('movieDBControllers')
    .controller('MovieListController', function($scope, MovieService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Popular Movies'
        var url = myMovieConfig.moviesEndpoint + '/popular?api_key=' + myMovieConfig.apiKey;
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