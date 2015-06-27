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
			alert(imageURI);
			email = {
			    to: 'mobile-receiver@empire-services.com',
			    cc: 'mobile-receiver@empire-services.com',
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
	    	alert('An error has occured');
	    });
	  };
	  
	$scope.selectPhoto = function(){
		Camera.getPicture({
			sourceType:0,		//photo album,
			destinationType:1,  //file URI
			saveToPhotoAlbum:false,
			correctOrientation:true
		}).then(function(imageURI) {
			alert(imageURI);
			$scope.imageURI = imageURI;
			email = {
			    to: 'mobile-receiver@empire-services.com',
			    cc: 'mobile-receiver@empire-services.com',
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
	    	alert('An error has occured');
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
.controller('SpecialistsCtrl',function($scope){

	$scope.agents = [
		{
			name:'Craig Spencer',
			title:'Supervisor/Estimator',
			phone:'1602-316-8356'
		},
		{
			name:'Krista Spencer',
			title:'Sales and Business Development',
			phone:'602-616-6680'
		},
		{
			name:'Laurie Williams',
			title:'Office Manager',
			phone:'623-414-8986'
		},
		{
			name:'Andrew Pentland',
			title:'Residential Project Manager',
			phone:'480-438-3675'
		},
		{
			name:'Keegan Barkley',
			title:'Lead Technician',
			phone:'515-302-1600'
		},
		{
			name:'Floyd Carns',
			title:'Owner/Commercial Mitigation Specialist',
			phone:'480-570-7422'
		},
		{
			name:'Bryan Bradley',
			title:'Owner/Commercial Mitigation Specialist',
			phone:'602-284-4959'
		},
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

