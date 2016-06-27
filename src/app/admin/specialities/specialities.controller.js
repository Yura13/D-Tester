(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService", "$mdBottomSheet"];

    function SpecialitiesController (specialitiesService, $mdBottomSheet) {
        var vm = this;
        vm.showSaveForm = showSaveForm;
        vm.removeSpeciality = removeSpeciality;

        activate();

        function activate() {
            getSpecialities();
        }

        function getSpecialities() {
            return specialitiesService.getSpecialities().then(function(response) {
                vm.list = response;
                return vm.list;
            });
        }

        function getSpecialityById(speciality) {
            return specialitiesService.getSpecialityById(speciality).then(function(response) {
                return response;
            });
        }

        function saveSpeciality(speciality) {
            return specialitiesService.saveSpeciality(speciality).then(function(response) {
                activate();
            });
        }

        function removeSpeciality(speciality) {
            return specialitiesService.removeSpeciality(speciality).then(function(response) {
                activate();
            });
        }

        function showSaveForm(speciality) {
            $mdBottomSheet.show({
                templateUrl: "app/admin/specialities/save-speciality.html",
                controller: "SaveFormEntityController as form",
                locals: {entity: speciality}
            }).then(function(entity) {
                saveSpeciality(entity);
                // $scope.alert = "clicked!";
            });
        }
    }
}());