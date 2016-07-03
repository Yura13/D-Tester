(function() {
    "use strict";

    angular.module("app.admin")
        .component("groups", {
            templateUrl: "app/admin/groups/groups.html",
            controller: "GroupsController as groups"
        });

}());