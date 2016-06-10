angular.module('modalModule',['ui.bootstrap'])
	.controller('ModalDemoCtrl', function ($scope , $modal ) {
		console.log('ModalDemoCtrl');
		$scope.open = function (movieId) {
			var modalInstance = $modal.open({
			  templateUrl: 'customContentModal.html',
			  windowTemplateUrl: 'containerModal.html',
			  controller: 'ModalInstanceCtrl',
			  resolve: {
					params: function(){
						return {
							movieId: movieId
						};
					}
				}
			});
		};
	})
	.controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, 
												params, MovieService, myMovieConfig) {

	var movieDetailsUrl = myMovieConfig.moviesEndpoint + '/' + params.movieId + '?api_key=' + 
								myMovieConfig.apiKey + '&append_to_response=releases,trailers';
        
    function assignMovieDetailsToScope(result) {
    		$scope.title = result.data.title;
            $scope.moveDetails = result.data;
            return result.data;
    }

    MovieService.getList(movieDetailsUrl)
            .then(assignMovieDetailsToScope)
            .catch(
            function(error) {
                console.log('error', error)
        });

    var movieCreditsUrl = myMovieConfig.moviesEndpoint + '/' + params.movieId + '/credits' + '?api_key=' + myMovieConfig.apiKey;
        
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

	$scope.ok = function () {
		$modalInstance.close('ok');
	};

	});