(function() {
    "use strict";

    angular.module("app.admin.groups")
        .controller("StudentsController", StudentsController);

    StudentsController.$inject = ["studentsService"];

    function StudentsController(studentsService) {
        var vm = this;

    }
})();

