(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SaveFormEntityController", SaveFormEntityController);

    SaveFormEntityController.$inject = ["$mdBottomSheet", "entity", "facultiesService", "specialitiesService", "$state"];

    function SaveFormEntityController($mdBottomSheet, entity, facultiesService, specialitiesService, $state) {
        var vm = this;
        vm.entity = entity || {};
        vm.clickSave = clickSave;
        vm.clickCancel = clickCancel;

        if ($state.is("admin.groups")) {
            facultiesService.getFaculties().then(function(response) {
                vm.faculties = response;
                return vm.faculties;
            });

            specialitiesService.getSpecialities().then(function(response) {
                vm.specialities = response;
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