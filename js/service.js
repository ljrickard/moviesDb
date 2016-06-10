angular.module('movieDBServices',[])
.factory('MovieService',function($http) {
//   
    return  { getList: getList };

    function getList(url){
			return $http.get(url);
        };
});