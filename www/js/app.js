// Ionic Starter App

angular.module('empire-services-mobile-app', ['ionic', 'empire-services.controllers','empire-services.services','ngCordova'])

.run(function($ionicPlatform) {
  //$cordovaStatusbar.hide();
  $ionicPlatform.ready(function() {

  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
  
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller:'AppCtrl'
  })
  
  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller:'HomeCtrl'
      }
    }
  })

  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html",
        controller:'ContactCtrl'
      }
    },
    
  })
  
    .state('app.specialists', {
    url: "/specialists",
    views: {
      'menuContent': {
        templateUrl: "templates/specialists.html",
        controller:'SpecialistsCtrl'
      }
    }
  })
  
  .state('app.about', {
    url: "/about",
    views: {
      'menuContent': {
        templateUrl: "templates/about.html"
      }
    }
  })
  
  .state('app.immediate-action', {
    url: "/immediate-action",
    views: {
      'menuContent': {
        templateUrl: "templates/immediate-action.html",
        controller:'ImmediateActionCtrl'
      }
    },
    
  })

  .state('app.immediate-action.details', {
    url: "/:id",
    views: {
      'menuContent@app': {
        templateUrl: "templates/immediate-action-detail.html",
        controller:'ImmediateActionDetailCtrl'
      }
    }, 
  })
  
  
  .state('app.photo', {
    url: "/photo?actionType",
    views: {
      'menuContent': {
        templateUrl: "templates/photo.html",
        controller:'PhotoCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
