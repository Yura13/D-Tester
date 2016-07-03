(function() {
    "use strict";

    angular.module("app.core")
        .service("helperService", helperService);

    helperService.$inject = ["$mdToast"];

    function helperService($mdToast) {
        this.sortedEntityByProperty = sortedEntityByProperty;
        this.showActionToast = showActionToast;
        
        function sortedEntityByProperty(entities, property) {
            var sorted = entities;

            sorted.sort(function(a,b) {
                if(a[property] < b[property]) { return -1; }
                else if(a[property] > b[property]) { return 1; }
                else return 0;
            });

            return sorted;
        }

        function showActionToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
            );
        }
    }
}());