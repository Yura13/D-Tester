(function() {
    "use strict";

    angular.module("app.admin")
        .controller("GroupsController", GroupsController);

    GroupsController.$inject = ["groupsService", "searchFilter", "$mdDialog", "$mdMedia", "$state", "$window",
        "MESSAGE", "PAGINATION"];

    function GroupsController(groupsService, searchFilter, $mdDialog, $mdMedia, $state, $window, MESSAGE,
                              PAGINATION) {
        var vm = this, list;
        vm.showSaveForm = showSaveForm;
        vm.removeGroup = removeGroup;
        vm.filterByName = filterByName;

        activate();

        function activate() {
            getGroups();
            getFaculties();
            getSpecialities();
            isScrollBottom();
        }

        function getGroups() {
            if ($state.is("admin.groups")) {
                return groupsService.getGroups().then(function(data) {
                    vm.filtered = data.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
                    list = data;
                });
            } else if ($state.is("admin.groupsByEntity")) {
                if ($state.params.entity === "faculty") {
                    var faculty = {
                        faculty_id: $state.params.entity_id
                    };
                    return groupsService.getGroupsByFaculty(faculty).then(function(data) {
                        vm.filtered = data.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
                        list = data;
                    });
                } else if (($state.params.entity === "speciality")) {
                    var speciality = {
                        speciality_id: $state.params.entity_id
                    };
                    return groupsService.getGroupsBySpeciality(speciality).then(function(data) {
                        vm.filtered = data.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
                        list = data;
                    });
                }
            }
        }

        function isScrollBottom() {
            angular.element($window).bind("scroll", function() {
                var windowHeight, body, html, docHeight, windowBottom;
                windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
                body = document.body;
                html = document.documentElement;
                docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
                windowBottom = windowHeight + window.pageYOffset;

                if (windowBottom >= docHeight) {
                    loadMore();
                }
            });
        }

        function loadMore() {
            var quantity = vm.filtered.length;
            vm.filtered = vm.filtered.concat(list.slice(quantity, quantity + PAGINATION.ENTITIES_RANGE_ON_PAGE));
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
            $mdDialog.show(
                $mdDialog.confirm()
                    .title(MESSAGE.DEL_CONFIRM)
                    .ok("Так")
                    .cancel("Ні")
            ).then(function() {
                return groupsService.removeGroup(group).then(function(response) {
                    activate();
                });
            });
        }

        function showSaveForm(group) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: "SaveFormEntityController as form",
                templateUrl: "app/admin/groups/save-group.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {entity: group}
            }).then(function (entity) {
                saveGroup(entity);
            });
        }

        function filterByName() {
            vm.filtered = vm.search ? searchFilter(list, "group_name", vm.search) : list.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
        }
    }
}());