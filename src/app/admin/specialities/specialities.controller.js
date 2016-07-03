(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService", "searchFilter", "$mdDialog", "$mdMedia", "$state",
        "$window", "MESSAGE", "PAGINATION"];

    function SpecialitiesController (specialitiesService, searchFilter, $mdDialog, $mdMedia, $state, $window,
                                     MESSAGE, PAGINATION) {
        var vm = this, list;
        vm.getGroupsBySpeciality = getGroupsBySpeciality;
        vm.showSaveForm = showSaveForm;
        vm.removeSpeciality = removeSpeciality;
        vm.filterByName = filterByName;
        
        activate();

        function activate() {
            getSpecialities();
            isScrollBottom();
        }

        function getSpecialities() {
            return specialitiesService.getSpecialities().then(function(data) {
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

        function getSpecialityById(speciality) {
            return specialitiesService.getSpecialityById(speciality).then(function(data) {
                return data;
            });
        }

        function getGroupsBySpeciality(speciality) {
            var entity = {
                entity: "speciality",
                entity_id: speciality.speciality_id
            };
            $state.go("admin.groupsByEntity", entity);
        }
        
        function saveSpeciality(speciality) {
            return specialitiesService.saveSpeciality(speciality).then(function(response) {
                activate();
            });
        }

        function removeSpeciality(speciality) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .title(MESSAGE.DEL_CONFIRM)
                    .ok("Так")
                    .cancel("Ні")
            ).then(function() {
                return specialitiesService.removeSpeciality(speciality).then(function(response) {
                    activate();
                });
            });
        }

        function showSaveForm(speciality) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: "SaveFormEntityController as form",
                templateUrl: "app/admin/specialities/save-speciality.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {entity: speciality}
            }).then(function (entity) {
                saveSpeciality(entity);
            });
        }
        
        function filterByName() {
            vm.filtered = vm.search ? searchFilter(list, "speciality_name", vm.search) : list.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
        }
    }
}());