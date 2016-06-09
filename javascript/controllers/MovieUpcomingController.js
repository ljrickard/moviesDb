angular.module('movieDBControllers')
    .controller('MovieUpcomingController', function($scope, MovieService, myMovieConfig) {
        $scope.loading = true;
        $scope.title = 'Upcoming Movies'
        var url = myMovieConfig.moviesEndpoint + '/upcoming?api_key=' + myMovieConfig.apiKey;
        MovieService.getList(url).then(
            function(result) {
                result.data.results.sort(function(a,b) {
                    return new Date(a.release_date) - new Date(b.release_date);
                });
                $scope.movieList = result.data.results;
                $scope.loading = false;
            }
        ).catch(
            function(error) {
                console.log('error', error)
            });

        // date calculations
        var todaysDate=new Date();
        var numOfDaysTilFriday=todaysDate.getDay()==6?5:5-todaysDate.getDay();
        var nextFridaysDate=new Date().setDate(todaysDate.getDate() + numOfDaysTilFriday);

        $scope.nextFridaysDate=nextFridaysDate;
    });

