(function() {
    "use strict";

    angular.module("app")
        .directive("appHeader", appHeader);

    appHeader.$inject = [];

    function appHeader() {
        var directive = {
            templateUrl: "app/components/header/header.directive.html",
            replace: true,
            controller: "HeaderController as header"
        };

        return directive;
    }
}());