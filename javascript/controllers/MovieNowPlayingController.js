angular.module('movieDBControllers')
    .controller('MovieNowPlayingController', function($scope, MovieService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Now Playing Movies'
        var url = myMovieConfig.moviesEndpoint + '/now_playing?api_key=' + myMovieConfig.apiKey;
        MovieService.getList(url).then(
            function(result) {
                $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
                $scope.loading = false;
            }
        ).catch(
            function(error) {
                console.log('error', error);

            });
    });