(function() {
    "use strict";

    angular.module("app.admin.groups")
        .controller("GroupsController", GroupsController);

    GroupsController.$inject = ["groupsService", "$mdBottomSheet", "$state", "$state"];

    function GroupsController(groupsService, $mdBottomSheet, $state) {
        var vm = this;
        vm.showSaveForm = showSaveForm;
        vm.removeGroup = removeGroup;

        activate();

        function activate() {
            getGroups();
            getFaculties();
            getSpecialities();
        }

        function getGroups() {
            if ($state.is("admin.groups")) {
                return groupsService.getGroups().then(function(data) {
                    vm.list = data;
                    return vm.list;
                });
            } else if ($state.is("admin.groupsByEntity")) {
                if ($state.params.entity === "faculty") {
                    var faculty = {
                        faculty_id: $state.params.entity_id
                    };
                    return groupsService.getGroupsByFaculty(faculty).then(function(data) {
                        vm.list = data;
                        return vm.list;
                    });
                } else if (($state.params.entity === "speciality")) {
                    var speciality = {
                        speciality_id: $state.params.entity_id
                    };
                    return groupsService.getGroupsBySpeciality(speciality).then(function(data) {
                        vm.list = data;
                        return vm.list;
                    });
                }
            }
        }

        function getGroupById(group) {
            return groupsService.getGroupById(group).then(function(data) {
                return data;
            });
        }

        function saveGroup(group) {
            return groupsService.saveGroup(group).then(function(response) {
                activate();
            });
        }

        function getFaculties() {
            return groupsService.getFaculties().then(function(data) {
                vm.faculties = data;
                return vm.faculties;
            });
        }

        function getSpecialities() {
            return groupsService.getSpecialities().then(function (data) {
                vm.specialities = data;
                return vm.specialities;
            });
        }
            
        function removeGroup(group) {
            return groupsService.removeGroup(group).then(function(response) {
                activate();
            });
        }

        function showSaveForm(group) {
            $mdBottomSheet.show({
                templateUrl: "app/admin/groups/save-group.html",
                controller: "SaveFormEntityController as form",
                locals: {entity: group}
            }).then(function(entity) {
                saveGroup(entity);
                // $scope.alert = "clicked!";
            });
        }
    }
}());


