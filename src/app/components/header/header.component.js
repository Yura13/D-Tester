(function() {
    "use strict";

    angular.module("app.admin")
        .component("appHeader", {
            templateUrl: "app/components/header/header.component.html",
            controller: "HeaderController as header"
        });
}());