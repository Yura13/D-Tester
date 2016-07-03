(function() {
    "use strict";

    angular.module("app.admin")
        .component("faculties", {
            templateUrl: "app/admin/faculties/faculties.html",
            controller: "FacultiesController as faculties"
        });

}());