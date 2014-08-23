angular.module('gameController', [])

// inject the player service factory into our controller
.controller('mainController', ['$scope','$http','Games', function($scope, $http, Games) {
  $scope.formData = {};
  $scope.loading = true;

  // GET =====================================================================
  // when landing on the page, get all players and show them
  // use the service to get all the games
  Games.get()
  .success(function(data) {
    $scope.games = data;
    $scope.loading = false;
  });

  // CREATE ==================================================================
  // when submitting the add form, send the text to the node API
  $scope.createGame = function() {
    $scope.loading = true;

    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    if ($scope.formData.name != undefined) {

      // call the create function from our service (returns a promise object)
      Games.create($scope.formData)

      // if successful creation, call our get function to get all the new games
      .success(function(data) {
        $scope.loading = false;
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.games = data; // assign our new list of games
      });
    }
  };

  // DELETE ==================================================================
  // delete a game after checking it
  $scope.deleteGame = function(id) {
    $scope.loading = true;

    Games.delete(id)
    // if successful creation, call our get function to get all the new games
    .success(function(data) {
      $scope.loading = false;
      $scope.games = data; // assign our new list of games
    });
  };
}]);
