(function() {
    "use strict";

    angular.module("app.core")
        .filter("search", search);

    search.$inject = [];

    function search() {
        return function(entities, property, search) {
            var filtered = [];

            // if (search) {
                angular.forEach(entities, function(entity) {

                    if(entity[property].toLowerCase().indexOf(search.toLowerCase()) !== -1){
                        filtered.push(entity);
                    }
                });
            // } else {
            //     return entities;
            // }

            // filtered.sort(function(a,b){
            //     if(a.indexOf(word) < b.indexOf(word)) return -1;
            //     else if(a.indexOf(word) > b.indexOf(word)) return 1;
            //     else return 0;
            // });

            return filtered;
        }
    }
}());