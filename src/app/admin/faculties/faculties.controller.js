(function() {
    "use strict";

    angular.module("app.admin")
        .controller("FacultiesController", FacultiesController);

    FacultiesController.$inject = ["facultiesService"];

    function FacultiesController (facultiesService) {
        var vm = this;
        
    }
})();