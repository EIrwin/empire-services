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

	$scope.initCall = function(number){
		window.open('tel:' + number, '_system')
	}
}])
.controller('HomeCtrl',['$scope','$state','$log',function($scope,$state,$log) {
	$log.info('HomeCtrl loaded');
}])
.controller('PhotoCtrl',['$scope','Camera','$log','$cordovaEmailComposer','$stateParams','$state',
	function($scope,Camera,$log,$cordovaEmailComposer,$stateParams,$state){

	var model = {
		comments: ''
	};

	if($stateParams.actionType != undefined){
		model.comments = 'Requesting service for ' + $stateParams.actionType + ' damage.'
	}


	$scope.model = model;
	var email;
	$scope.getPhoto = function() {
	    Camera.getPicture({
	    	sourceType:1,		//camera
			destinationType:0,	//Data URI
			saveToPhotoAlbum:false,
			correctOrientation:true
		}).then(function(imageData) {
			var data = "data:image/jpeg;base64," + imageData;
			$scope.imageData = data;

			email = {
			    to: 'mobile-receiver@empire-services.com',
			    cc: 'mobile-receiver@empire-services.com',
			    subject: 'Mobile App Photo',
			    attachments: 'base64:image.jpeg//' + imageData,
			    isHtml: true
			  };
	    }, function(err) {
	    	alert('An error has occured');
	    });
	  };
	  
	$scope.selectPhoto = function(){
		Camera.getPicture({
			sourceType:0,		//photo album,
			destinationType:0,  //Data URI
			saveToPhotoAlbum:false,
			correctOrientation:true,
		}).then(function(imageData) {
			var data = "data:image/jpeg;base64, " + imageData;
			$scope.imageData = data;

			email = {
			    to: 'mobile-receiver@empire-services.com',
			    cc: 'mobile-receiver@empire-services.com',
			    subject: 'Mobile App Photo',
			    attachments: 'base64:image.jpeg//' + imageData,
			    isHtml: true
			  };		 
	    }, function(err) {
	    	alert(err);
	    });
	};


	$scope.sendPhoto = function(){

		email.body = '<p>' + $scope.model.comments + '</p>';
		if(email != null){
			$cordovaEmailComposer.open(email).then(null, function () {
				// user cancelled email
			});
		}else{
			alert('An error has occured');
		}
	};
}])
.controller('SpecialistsCtrl',function($scope){

	$scope.agents = [
		{
			name: 'Andrew Pentland',
			title: 'Residential Project Manager',
			phone:'480-438-3675'
		},
		{
			name:'Bryan Bradley',
			title:'Owner/Commercial Mitigation Specialist',
			phone:'602-284-4959'
		},
		{
			name:'Craig Spencer',
			title:'Supervisor/Estimator',
			phone:'602-316-8356'
		},
		{
			name:'Floyd Carns',
			title:'Owner/Commercial Mitigation Specialist',
			phone:'480-570-7422'
		},
		{
			name:'Keegan Barkley',
			title:'Lead Technician',
			phone:'515-302-1600'
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
		}


	];
})
.controller('ImmediateActionCtrl', ['$scope','$state',function($scope,$state){

	console.log('ImmediateActionCtrl loaded');

	$scope.goToState = function(param){
		$state.go('app.immediate-action.details', {id : param});
	};
	
}])
.controller('ImmediateActionDetailCtrl',['$scope','$stateParams','$state',function($scope,$stateParams,$state){
	$scope.actionType = $stateParams.id;

	$scope.requestService = function(actionType){
		$state.go('app.photo', {actionType:actionType});
	}
}]);

