(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SaveFormEntityController", SaveFormEntityController);

    SaveFormEntityController.$inject = ["$mdBottomSheet", "entity"];

    function SaveFormEntityController($mdBottomSheet, entity) {
        var vm = this;
        vm.entity = entity || {};
        vm.clickSave = clickSave;
        vm.clickCancel = clickCancel;

        function clickSave(entity) {
            $mdBottomSheet.hide(entity);
        }

        function clickCancel() {
            $mdBottomSheet.cancel();
        }
    }
})();