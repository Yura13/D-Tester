(function() {
    "use strict";

    angular.module("app.admin")
        .factory("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["$http", "$q", "BASE_URL", "URL", "PAGINATION"];

    function specialitiesService($http, $q, BASE_URL, URL, PAGINATION) {
        var service = {
            
        };

        return service;

        
    }

})();