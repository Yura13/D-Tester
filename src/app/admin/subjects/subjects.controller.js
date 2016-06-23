(function() {
    "use strict";

    angular.module("app.admin.subjects")
        .controller("SubjectsController", SubjectsController);

    SubjectsController.$inject = ["subjectsService"];

    function SubjectsController (subjectsService) {
        var vm = this;
       
    }
})();