(function() {
    "use strict";

    angular.module("app")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = [];

    function HeaderController() {
        var vm = this;
        vm.menu = [
            {name: "Факультети", state: "admin.faculties"},
            {name: "Спеціальності", state: "admin.specialities"},
            {name: "Групи", state: "admin.groups"},
            {name: "Предмети", state: "admin.subjects"}
        ];
    }
})();