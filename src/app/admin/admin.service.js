(function() {
    "use strict";

    angular.module("app.admin")
        .factory("adminService", adminService);
   
    adminService.$inject = ["$http", "$q", "BASE_URL", "URL", "ENTITIES_UKR"];

    function adminService($http, $q, BASE_URL, URL, ENTITIES_UKR) {
        var service = {
            
        }; 

        return service;
        
    }

}());