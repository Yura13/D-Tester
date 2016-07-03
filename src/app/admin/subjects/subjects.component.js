(function() {
    "use strict";

    angular.module("app.admin")
        .component("subjects", {
            templateUrl: "app/admin/subjects/subjects.html",
            controller: "SubjectsController as subjects"
        });

}());