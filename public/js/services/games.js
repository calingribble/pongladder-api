angular.module('gameService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Games', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/games');
			},
			create : function(gameData) {
				return $http.post('/api/games', gameData);
			},
			delete : function(id) {
				return $http.delete('/api/games/' + id);
			}
		}
	}]);
