angular.module('empire-services.services', [])

.factory('Camera', ['$q', function($q) {
  return {
    
    getPicture: function(options) {
      var q = $q.defer();
      if(navigator.camera != undefined){
        navigator.camera.getPicture(function(result) {
          // Do any magic you need
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);
      }else{
        //this will happen if we
        //are not on device with camera
        //support such as a browser
        q.reject(false);
      }

      return q.promise;
    }
  };
}]);