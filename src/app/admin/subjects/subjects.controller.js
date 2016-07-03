(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SubjectsController", SubjectsController);

    SubjectsController.$inject = ["subjectsService", "searchFilter", "$mdDialog", "$mdMedia", "$state", "$window",
        "MESSAGE", "PAGINATION"];

    function SubjectsController (subjectsService, searchFilter, $mdDialog, $mdMedia, $state, $window, MESSAGE,
                                 PAGINATION) {
        var vm = this, list;
        vm.showSaveForm = showSaveForm;
        vm.getTestsBySubject = getTestsBySubject;
        vm.getSchedulesBySubject = getSchedulesBySubject;
        vm.removeSubject = removeSubject;
        vm.filterByName = filterByName;

        activate();

        function activate() {
            getSubjects();
            isScrollBottom();
        }

        function getSubjects() {
            return subjectsService.getSubjects().then(function(data) {
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

        function getSubjectById(subject) {
            return subjectsService.getSubjectById(subject).then(function(data) {
                return data;
            });
        }

        function getTestsBySubject() {

        }

        function getSchedulesBySubject() {

        }

        function saveSubject(subject) {
            return subjectsService.saveSubject(subject).then(function(response) {
                activate();
            });
        }

        function removeSubject(subject) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .title(MESSAGE.DEL_CONFIRM)
                    .ok("Так")
                    .cancel("Ні")
            ).then(function() {
                return subjectsService.removeSubject(subject).then(function(response) {
                    activate();
                });
            });
        }

        function showSaveForm(subject) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: "SaveFormEntityController as form",
                templateUrl: "app/admin/subjects/save-subject.html",
                parent: angular.element(document.body),
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {entity: subject}
            }).then(function (entity) {
                saveSubject(entity);
            });
        }

        function filterByName() {
            vm.filtered = vm.search ? searchFilter(list, "subject_name", vm.search) : list.slice(0, PAGINATION.ENTITIES_RANGE_ON_PAGE);
        }
      
    }
}());