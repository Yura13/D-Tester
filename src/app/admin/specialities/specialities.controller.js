(function() {
    "use strict";

    angular.module("app.admin")
        .controller("SpecialitiesController", SpecialitiesController);

    SpecialitiesController.$inject = ["specialitiesService"];

    function SpecialitiesController (specialitiesService) {
        var vm = this;
       
    }
})();