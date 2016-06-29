(function() {
    "use strict";

    angular.module("app.admin")
        .controller("HeaderController", HeaderController);

    HeaderController.$inject = ["MENU_ITEMS"];

    function HeaderController(MENU_ITEMS) {
        var vm = this;
        vm.menu = MENU_ITEMS;
    }
})();