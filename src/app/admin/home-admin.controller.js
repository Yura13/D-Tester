(function() {
    "use strict";

    angular.module("app.admin")
        .controller("HomeAdminController", HomeAdminController);

    HomeAdminController.$inject = ["adminService"];

    function HomeAdminController(adminService) {
        var vm = this;
       
    }
}());