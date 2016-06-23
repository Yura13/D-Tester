(function() {
    "use strict";

    angular.module("app.core")
        .factory("coreEntityService", coreEntityService);

    coreEntityService.$inject = ["$http", "BASE_URL","URL"];

    function coreEntityService($http, BASE_URL, URL) {
        var service = {
            getEntitiesById: getEntitiesById
        };

        return service;

        function getEntitiesById() {
           
        }
    }
})();
