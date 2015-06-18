angular.module('empire-services.controllers', [])

//apparently the following config
//is necessary for handling the different file paths
//for the images captured by the cordova camera plugin
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('AppCtrl',['$scope','$state',function($scope,$state){
	console.log('AppCtrl loaded');
	$scope.switchToState = function(state){
		$state.go(state);
	};
}])
.controller('HomeCtrl',['$scope','$state', function($scope,$state) {
	console.log('HomeCtrl loaded');
}])
.controller('ContactCtrl',function($scope){
	
})
.controller('PhotoCtrl',['$scope','Camera','$log',function($scope,Camera,$log){
	$scope.getPhoto = function() {
	    Camera.getPicture({
			destinationType:1,	//file URI
			saveToPhotoAlbum:false,
			correctOrientation:true
		}).then(function(imageURI) {
			$scope.imageURI = imageURI;
	    }, function(err) {
	    	$log.error(err);
	    });
	  };
	  
	$scope.selectPhoto = function(){
		Camera.getPicture({
			sourceType:2,		//photo album,
			destinationType:2,  //base64
			saveToPhotoAlbum:false,
			correctOrientation:true
		}).then(function(imageData) {
//	     	$scope.imageURI = imageURI;
			$scope.imageData = "data:image/jpeg;base64," + imageData;
	    }, function(err) {
	      	$log.error(err);
	    });
	};
	
	$scope.sendPhoto = function(){
		
	};
}])
.controller('AgentsCtrl',function($scope){
	$scope.agents = [
		{
			name:'John Smith',
			title:'Manager',
			phone:'111-222-3333',
			email:'john.smith@gmail.com',
			photoUrl:'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
		},
		{
			name:'Michelle Parker',
			title:'Agent',
			phone:'333-122-3333',
			email:'michelle.parker@gmail.com',
			photoUrl:'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
		},
		{
			name:'Derek Hall',
			title:'Supervisor',
			phone:'111-222-3333',
			email:'derek.hall@gmail.com',
			photoUrl:'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
		}
	];
})
.controller('ImmediateActionCtrl', ['$scope','$state',function($scope,$state){

	console.log('ImmediateActionCtrl loaded');

	$scope.goToState = function(param){
		$state.go('app.immediate-action.details', {id : param});
	};
	
}])
.controller('ImmediateActionDetailCtrl',['$scope','$stateParams',function($scope,$stateParams){
	$scope.actionType = $stateParams.id;
}]);

