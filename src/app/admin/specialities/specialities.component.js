(function() {
    "use strict";

    angular.module("app.admin")
        .component("specialities", {
            templateUrl: "app/admin/specialities/specialities.html",
            controller: "SpecialitiesController as specialities"
        });

}());