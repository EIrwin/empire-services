// Ionic Starter App

angular.module('empire-services-mobile-app', ['ionic', 'empire-services.controllers','empire-services.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

  });
})

.config(function($stateProvider, $urlRouterProvider) {
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
        templateUrl: "templates/home.html"
      }
    },
    controller:'HomeCtrl'
  })

  .state('app.contact', {
    url: "/contact",
    views: {
      'menuContent': {
        templateUrl: "templates/contact.html"
      }
    },
    controller:'ContactCtrl'
  })
  
    .state('app.agents', {
    url: "/agents",
    views: {
      'menuContent': {
        templateUrl: "templates/agents.html",
        controller:'AgentsCtrl'
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
        templateUrl: "templates/immediate-action.html"
      }
    },
    controller:'ImmediateActionCtrl'
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
