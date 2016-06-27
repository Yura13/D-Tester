(function() {
    "use strict";

    angular.module("app.admin")
        .controller("FacultiesController", FacultiesController);

    FacultiesController.$inject = ["facultiesService", "$mdBottomSheet", "$state"];

    function FacultiesController (facultiesService, $mdBottomSheet, $state) {
        var vm = this;
        vm.getGroupsByFaculty = getGroupsByFaculty;
        vm.showSaveForm = showSaveForm;
        vm.removeFaculty = removeFaculty;

        activate();

        function activate() {
            getFaculties();
        }

        function getFaculties() {
            return facultiesService.getFaculties().then(function(response) {
                vm.list = response;
                return vm.list;
            });
        }

        function getFacultyById(faculty) {
            return facultiesService.getFacultyById(faculty).then(function(response) {
                return response;
            });
        }

        function getGroupsByFaculty(faculty) {
            var entity = {
                entity: "faculty",
                entity_id: faculty.faculty_id
            };
            $state.go("admin.groupsByEntity", entity);
        }

        function saveFaculty(faculty) {
            return facultiesService.saveFaculty(faculty).then(function(response) {
                activate();
            });
        }

        function removeFaculty(faculty) {
            return facultiesService.removeFaculty(faculty).then(function(response) {
                activate();
            });
        }

        function showSaveForm(faculty) {
            $mdBottomSheet.show({
                templateUrl: "app/admin/faculties/save-faculty.html",
                controller: "SaveFormEntityController as form",
                locals: {entity: faculty}
            }).then(function(entity) {
                saveFaculty(entity);
                // $scope.alert = "clicked!";
            });
        }
    }
}());