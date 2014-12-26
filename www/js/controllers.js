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
    { title: 'Celeb', imagelink: "img/Celeb.png",desc: "See celebrities as bebo characters!" },
    { title: 'Other', imagelink: "img/other.png",desc: "Crazy and random hastags!" },
    { title: 'Things', imagelink: "img/things.png",desc: "On the #phone"  },
    { title: 'Food', imagelink: "img/food.png",desc: "#nom" },
    { title: 'Sport', imagelink: "img/sport.png",desc: "Off to play #football"  },
    { title: 'Dance', imagelink: "img/dance.png",desc: "Oppa #gagnamstyle!" },
    { title: 'Moods', imagelink: "img/moods.png",desc: "Bebo makes me #happy"},
    { title: 'Transport', imagelink: "img/Transport.png",desc:"In my #car" },
    { title: 'Expressions', imagelink: "img/expresions.png",desc:"#OMGROFLMAO" }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams,$http,$ionicLoading) {

  var parts = document.URL.split("/");
  var result = parts[parts.length - 1];
  $scope.pTitle = result;
  $ionicLoading.show();
  $http.get('http://www.bebohashtags.co.uk/crud.php?cat='+result)
  .success(function(data, status, headers, config) {
   for(i=0;i<data.length;i++){

    if (data[i].imagelink.indexOf("twimg") ==-1){
        data[i].imagelink = "http://bebohashtags.co.uk/pic/"+data[i].imagelink;
      }
      if (data[i].hash.indexOf("#") ==-1){
        data[i].hash = "#"+data[i].hash;
      }


   }
   $ionicLoading.hide();
   $scope.things = data;
  }).
  error(function(data, status, headers, config) {
    $ionicLoading.hide();
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    alert('Check your internet connection, there has been an error :( ')
  });


});
