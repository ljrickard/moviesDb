angular.module('movieDBControllers')
    .controller('MovieDetailsController', function($scope, $routeParams, MovieService, myMovieConfig) {

        $scope.loading = true;
        $scope.title = 'Movie Details';
        $scope.id = $routeParams.movieId;
        var movieDetailsUrl = myMovieConfig.moviesEndpoint + '/' + $routeParams.movieId + '?api_key=' + myMovieConfig.apiKey + '&append_to_response=releases,trailers';
        
        function assignMovieDetailsToScope(result) {
                $scope.moveDetails = result.data;
                return result.data;
        }

        $scope.loading = false;

        MovieService.getList(movieDetailsUrl)
            .then(assignMovieDetailsToScope)
            .catch(
            function(error) {
                console.log('error', error)
        });

        var movieCreditsUrl = myMovieConfig.moviesEndpoint + '/' + $routeParams.movieId + '/credits' + '?api_key=' + myMovieConfig.apiKey;
        
        function director(obj) {
            return obj.job == 'Director';
        }

        function assignDirectorNameToScope(result) {
            $scope.director = result.data.crew.filter(director)[0].name;
            return result;    
        }

        function assignMovieCreditsToScope(result){
            $scope.movieCredits = result.data;
            return result;
        }

        MovieService.getList(movieCreditsUrl)
        .then(assignMovieCreditsToScope)
        .then(assignDirectorNameToScope)
        .catch(
        function(error) {
            console.log('error', error)
        });
    });


