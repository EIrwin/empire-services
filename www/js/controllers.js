angular.module('empire-services.controllers', [])

//apparently the following config
//is necessary for handling the different file paths
//for the images captured by the cordova camera plugin
.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.controller('AppCtrl',['$scope','$state','$log','$cordovaEmailComposer',function($scope,$state,$log,$cordovaEmailComposer){
	$log.info('AppCtrl loaded');

	$scope.switchToState = function(state){
		$state.go(state);
	};

	$scope.openEmail = function(){

		var email = {
		    to: 'newloss@empireserviceswest.com',
		    subject: 'Mobile App Contact',
		    isHtml: true
		  };

		// //open the email prompt
		 $cordovaEmailComposer.open(email).then(null, function () {
		   // user cancelled email
		   $log.info('User cancelled email composition');
		 });
	}
}])
.controller('HomeCtrl',['$scope','$state','$log',function($scope,$state,$log) {
	$log.info('HomeCtrl loaded');
}])
.controller('PhotoCtrl',['$scope','Camera','$log','$cordovaEmailComposer',function($scope,Camera,$log,$cordovaEmailComposer){

	var email;
	$scope.getPhoto = function() {
	    Camera.getPicture({
	    	sourceType:1,		//camera
			destinationType:1,	//file URI
			saveToPhotoAlbum:false,
			correctOrientation:true
		}).then(function(imageURI) {
			$scope.imageURI = imageURI;
			email = {
			    to: 'mobile-receiver@empire-services.com',
			    cc: 'mobile-receiver@empire-services.com',
			    bcc: ['john@doe.com', 'jane@doe.com'],
			    subject: 'Mobile App Photo',
			    attachments: [imageURI],
			    isHtml: true
			  };

			 //open the email prompt
			 $cordovaEmailComposer.open(email).then(null, function () {
			   // user cancelled email
			   $log.info('User cancelled email composition');
			 });
	    }, function(err) {
	    	$log.error(err);
	    });
	  };
	  
	$scope.selectPhoto = function(){
		Camera.getPicture({
			sourceType:0,		//photo album,
			destinationType:1,  //file URI
			saveToPhotoAlbum:false,
			correctOrientation:true
		}).then(function(imageURI) {
			$scope.imageURI = imageURI;
			email = {
			    to: 'mobile-receiver@empire-services.com',
			    cc: 'mobile-receiver@empire-services.com',
			    bcc: ['john@doe.com', 'jane@doe.com'],
			    subject: 'Mobile App Photo',
			    attachments: [imageURI],
			    isHtml: true
			  };

			 
	    }, function(err) {
	      	// $log.error(err);
	    });
	};

	$scope.sendPhoto = function(){
    	console.log('send photo clicked! ', email);
    	//open the email prompt
		$cordovaEmailComposer.open(email).then(null, function () {
		// user cancelled email
		});
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

