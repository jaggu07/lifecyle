angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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

.factory('Movies', function($http) {
  var cachedData;
 
  function getData(moviename, callback) {
 
    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
 
    $http.get(url + mode + key + name).success(function(data) {
 
      cachedData = data.results;
      callback(data.results);
    });
  }
 
  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };
 
})
 
.controller('ListCtrl', function($scope, $ionicLoading, $window,$timeout, $http,  $ionicLoading,Movies) {
     $scope.doRefresh = function() {
        $timeout( function() {
          $window.location.reload();

          $ionicLoading.show({
            template: '<ion-spinner icon="dots"></ion-spinner>'
            }).then(function(){
        });
            
            $scope.$broadcast('scroll.refreshComplete');
        }, 5000);
    };
  $scope.$on('$ionicView.loaded', function(){
    console.log('View1 - loaded');

  }); 
  
  $scope.$on('$ionicView.enter', function(){
    console.log('View1 - enter');  
  });  
 
  $scope.$on('$ionicView.leave', function(){
     console.log('View1 - leave'); 
  });
  
  $scope.$on('$ionicView.beforeEnter', function(){
     console.log('View1 - beforeEnter'); 
     $ionicLoading.show({
            template: '<ion-spinner icon="dots"></ion-spinner>',
            duration: 2000
            }).then(function(){
        });
  });
  
  $scope.$on('$ionicView.afterEnter', function(){
     console.log('View1 - afterEnter'); 
  });
  
  $scope.$on('$ionicView.beforeLeave', function(){
     console.log('View1 - beforeLeave'); 
  });
  
  $scope.$on('$ionicView.afterLeave', function(){
     console.log('View1 - afterLeave'); 
  });
  
  $scope.$on('$ionicView.unloaded', function(){
     console.log('View1 - unloaded'); 
  });
 
  $scope.movie = {
    name: 'Batman'
  }
 
  $scope.searchMovieDB = function() {
 
    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });
     
  };
  
  $scope.searchMovieDB();
  
})
 
.controller('ViewCtrl', function($scope,$ionicLoading, $http, $stateParams, Movies) {
  
       $scope.doRefresh = function() {
        $timeout( function() {
            $window.location.reload();
            $scope.$broadcast('scroll.refreshComplete');
        }, 5000);
    };
  $scope.$on('$ionicView.loaded', function(){
    console.log('View2 - loaded'); 
  }); 
  
  $scope.$on('$ionicView.enter', function(){
    console.log('View2 - enter');  
  });  
 
  $scope.$on('$ionicView.leave', function(){
     console.log('View2 - leave'); 
  });
  
  $scope.$on('$ionicView.beforeEnter', function(){
     console.log('View2 - beforeEnter'); 
         $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
       duration: 2000
    });
  });
  
  $scope.$on('$ionicView.afterEnter', function(){
     console.log('View2 - afterEnter'); 
              $ionicLoading.hide({
      template: 'Loading...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  });
  
  $scope.$on('$ionicView.beforeLeave', function(){
     console.log('View2 - beforeLeave'); 
  });
  
  $scope.$on('$ionicView.afterLeave', function(){
     console.log('View2 - afterLeave'); 
  });
  
  $scope.$on('$ionicView.unloaded', function(){
     console.log('View2 - unloaded'); 
  });  
  
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});
