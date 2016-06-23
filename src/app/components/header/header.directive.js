(function() {
    "use strict";

    angular.module("app")
        .directive("appHeader", appHeader);

    appHeader.$inject = [];

    function appHeader() {
        var directive = {
            templateUrl: "app/components/header/header.directive.html",
            replace: true,
            controller: HeaderController,
            controllerAs: "header"
        };

        return directive;
    }

    function HeaderController() {
        var vm = this;
        vm.isNavCollapsed = true;
        vm.navCollapse = navCollapse;
        
        function navCollapse() {
            vm.isNavCollapsed = !vm.isNavCollapsed;
        }
    }
})();