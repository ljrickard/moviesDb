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

        function replaceDatesWithDays(result){
            var todaysDate=new Date();

            for(var key in result){
                if(calculateDifferenceFromToday(new Date(key))<=7){
                    key=getDayAsString(new Date(key).getDay());
                }
            }
            return result;
        }

        function calculateDifferenceFromToday(date){
            return Math.ceil(Math.abs(date.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
        }

        function getDayAsString(number){
            switch (number) {
              case 0:
                return "Sunday";
              case 1:
                return "Monday";
              case 2:
                return "Tuesday";
              case 3:
                return "Wednesday";
              case 4:
                return "Thurday";
              case 5:
                return "Friday";
              case 6:
                return "Saturday";
              default:
                return "Not Found";
            }
        }

        function assignMoviesToScope(result){
            $scope.movieList = result;
        }

        // I dont understand why this is here
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