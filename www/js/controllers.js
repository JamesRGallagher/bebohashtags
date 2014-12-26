angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Celeb', id: 1 },
    { title: 'Other', id: 2 },
    { title: 'Things', id: 3 },
    { title: 'Food', id: 4 },
    { title: 'Sport', id: 5 },
    { title: 'Dance', id: 6 },
    { title: 'Moods', id: 7 },
    { title: 'Transport', id: 8 },
    { title: 'Expressions', id: 9 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams,$http) {

  var parts = document.URL.split("/");
  var result = parts[parts.length - 1];
  $scope.pTitle = result;
  $http.get('http://www.bebohashtags.co.uk/crud.php?cat='+result)
  .success(function(data, status, headers, config) {
   for(i=0;i<data.length;i++){

    if (data[i].imagelink.indexOf("twimg") ==-1){
        data[i].imagelink = "http://bebohashtags.co.uk/pic/"+data[i].imagelink;
      }


   }
   $scope.things = data;
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert('Check your internet connection, there has been an error :( ')
  });


});
