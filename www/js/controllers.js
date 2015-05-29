angular.module('empire-services.controllers', [])

.controller('AppCtrl',function($scope){
	
})
.controller('HomeCtrl', function($scope) {
	
})
.controller('ContactCtrl',function($scope){
	
})
.controller('ContactListCtrl',function($scope){
	$scope.contacts = [
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
.controller('ImmediateActionCtrl',function($scope){
	
});
