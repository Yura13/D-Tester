(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService", "$mdBottomSheet", "$state"];

    function SpecialitiesController (specialitiesService, $mdBottomSheet, $state) {
        var vm = this;
        vm.getGroupsBySpeciality = getGroupsBySpeciality;
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

        function getGroupsBySpeciality(speciality) {
            var entity = {
                entity: "speciality",
                entity_id: speciality.speciality_id
            };
            console.log(entity);
            $state.go("admin.groupsByEntity", entity);
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