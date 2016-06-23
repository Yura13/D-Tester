(function() {
    "use strict";

    angular.module("app.admin")
        .factory("facultiesService", facultiesService);

    facultiesService.$inject = ["$http", "$q", "BASE_URL", "URL", "PAGINATION"];

    function facultiesService($http, $q, BASE_URL, URL, PAGINATION) {
        var service = {
            
        };

        return service;

        
    }

})();