(function() {
    "use strict";

    angular.module("app.core")
        .controller("SaveFormEntityController", SaveFormEntityController);

    SaveFormEntityController.$inject = ["$mdBottomSheet", "entity", "facultiesService", "specialitiesService", "$state"];

    function SaveFormEntityController($mdBottomSheet, entity, facultiesService, specialitiesService, $state) {
        var vm = this;
        vm.entity = entity || {};
        vm.clickSave = clickSave;
        vm.clickCancel = clickCancel;

        if ($state.is("admin.groups") || $state.is("admin.groupsByEntity")) {
            facultiesService.getFaculties().then(function(data) {
                vm.faculties = data;
                return vm.faculties;
            });

            specialitiesService.getSpecialities().then(function(data) {
                vm.specialities = data;
                return vm.specialities;
            });
        }

        function clickSave(entity) {
            $mdBottomSheet.hide(entity);
        }

        function clickCancel() {
            $mdBottomSheet.cancel();
        }
    }
})();