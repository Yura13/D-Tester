(function() {
    "use strict";

    angular.module("app.core")
        .filter("search", search);

    search.$inject = ["helperService"];

    function search(helperService) {
        return function(entities, property, search) {
            var filtered = [];

            angular.forEach(entities, function(entity) {
                if(entity[property].toLowerCase().indexOf(search.toLowerCase()) !== -1){
                    filtered.push(entity);
                }
            });

            filtered = helperService.sortedEntityByProperty(filtered, property);

            return filtered;
        }
    }
}());