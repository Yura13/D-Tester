(function() {
    "use strict";

    angular.module("app.admin")
        .controller("FacultiesController", FacultiesController);

    FacultiesController.$inject = ["facultiesService", "searchFilter", "$mdDialog", "$mdMedia", "$state", "$window", 
        "MESSAGE", "PAGINATION"];

    function FacultiesController (facultiesService, searchFilter, $mdDialog, $mdMedia, $state, $window, MESSAGE,
                                  PAGINATION) {
        var vm = this, list;
        vm.getGroupsByFaculty = getGroupsByFaculty;
        vm.showSaveForm = showSaveForm;
        vm.removeFaculty = removeFaculty;
        vm.filterByName = filterByName;

        activate();

        function activate() {
            getFaculties();
            isScrollBottom();
        }

        function getFaculties() {
            return facultiesService.getFaculties().then(function(data) {
                vm.filtered = data.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
                list = data;
            });
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

        function getFacultyById(faculty) {
            return facultiesService.getFacultyById(faculty).then(function(data) {
                return data;
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
            $mdDialog.show(
                $mdDialog.confirm()
                    .title(MESSAGE.DEL_CONFIRM)
                    .ok("Так")
                    .cancel("Ні")
                ).then(function() {
                    return facultiesService.removeFaculty(faculty).then(function(response) {
                        activate();
                });
            });
        }

        function showSaveForm(faculty) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: "SaveFormEntityController as form",
                templateUrl: "app/admin/faculties/save-faculty.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {entity: faculty}
            }).then(function (entity) {
                saveFaculty(entity);
            });
        }
        
        function filterByName() {
            vm.filtered = vm.search ? searchFilter(list, "faculty_name", vm.search) : list.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
        }
    }
}());