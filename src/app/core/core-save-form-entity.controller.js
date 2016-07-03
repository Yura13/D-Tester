(function() {
    "use strict";

    angular.module("app.core")
        .controller("SaveFormEntityController", SaveFormEntityController);

    SaveFormEntityController.$inject = ["entity", "facultiesService", "specialitiesService", "$state", "$mdDialog", "$mdToast", "MESSAGE"];

    function SaveFormEntityController(entity, facultiesService, specialitiesService, $state, $mdDialog, $mdToast, MESSAGE) {
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
            $mdDialog.hide(entity);
        }

        function clickCancel() {
            $mdDialog.cancel();
            $mdToast.show(
                $mdToast.simple()
                    .textContent(MESSAGE.SAVE_CANCEL)
            );
        }
    }
}());