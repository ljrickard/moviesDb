angular.module('movieDBControllers')
    .controller('MovieUpcomingController', function($scope, _, MovieService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Upcoming Movies'
        var url = myMovieConfig.moviesEndpoint + '/upcoming?api_key=' + myMovieConfig.apiKey;

        function releaseDate(a,b){
            return new Date(a.release_date) - new Date(b.release_date);
        }

        function sortMoviesByReleaseDate(result){
            return result.data.results.sort(releaseDate);
        }

        function groupMoviesByReleaseDate(result){
            return _.groupBy(result, 'release_date');
        }

        function assignMoviesToScope(result){
            $scope.movieList = result;
        }

        $scope.loading = false;

        MovieService.getList(url)
            .then(sortMoviesByReleaseDate)
            .then(groupMoviesByReleaseDate)
            .then(assignMoviesToScope)
            .catch(
            function(error) {
                console.log('error', error)
            });
    });