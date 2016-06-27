(function() {
    "use strict";

    angular.module("app.admin.groups")
        .service("groupsService", groupsService);

    groupsService.$inject = ["$http", "$q", "BASE_URL", "URL", "PAGINATION", "coreEntityService"];

    function groupsService($http, $q, BASE_URL, URL, PAGINATION, coreEntityService) {
        this.getGroups = getGroups;
        this.getGroupById = getGroupById;
        this.getGroupsByFaculty = getGroupsByFaculty;
        this.getGroupsBySpeciality = getGroupsBySpeciality;
        this.saveGroup = saveGroup;
        this.removeGroup = removeGroup;

        function getGroups() {
            return coreEntityService.getEntities(URL.ENTITIES.GROUP).then(function(response) {
                return response;
            });
        }

        function getGroupById(group) {
            return coreEntityService.getEntityById(URL.ENTITIES.GROUP, group.group_id).then(function(response) {
                return response;
            });
        }

        function getGroupsByFaculty(faculty) {
            return coreEntityService.getEntitiesByEntityId(URL.ENTITIES.GROUP, URL.GET_GROUPS_BY_FACULTY, faculty.faculty_id)
                .then(function(response) {
                    return response;
                });
        }

        function getGroupsBySpeciality(speciality) {
            return coreEntityService.getEntitiesByEntityId(URL.ENTITIES.SPECIALITY, URL.GET_GROUPS_BY_SPECIALITY, speciality.speciality_id)
                .then(function(response) {
                    return response;
                });
        }

        function saveGroup(group) {
            if (group.group_id === undefined) {
                return coreEntityService.addEntity(URL.ENTITIES.GROUP, group);
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.GROUP, group.group_id, group);
            }
        }

        function removeGroup(group) {
            return coreEntityService.removeEntity(URL.ENTITIES.GROUP, group.group_id);
        }
    }
}());