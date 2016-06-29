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
        this.getFaculties = getFaculties;
        this.getSpecialities = getSpecialities;
        this.saveGroup = saveGroup;
        this.removeGroup = removeGroup;

        function getGroups() {
            return coreEntityService.getEntities(URL.ENTITIES.GROUP).then(function(data) {
                return data;
            });
        }

        function getGroupById(group) {
            return coreEntityService.getEntityById(URL.ENTITIES.GROUP, group.group_id).then(function(data) {
                return data;
            });
        }

        function getGroupsByFaculty(faculty) {
            return coreEntityService.getEntitiesByEntityId(URL.ENTITIES.GROUP, URL.GET_GROUPS_BY_FACULTY, faculty.faculty_id)
                .then(function(data) {
                    return data;
                });
        }

        function getGroupsBySpeciality(speciality) {
            return coreEntityService.getEntitiesByEntityId(URL.ENTITIES.GROUP, URL.GET_GROUPS_BY_SPECIALITY, speciality.speciality_id)
                .then(function(data) {
                    return data;
                });
        }

        function getFaculties() {
            return coreEntityService.getEntities(URL.ENTITIES.FACULTY).then(function(data) {
                var faculties = [];
                angular.forEach(data, function(faculty) {
                    faculties[+faculty.faculty_id] = faculty.faculty_name;
                });
                return faculties;
            });
        }

        function getSpecialities() {
            return coreEntityService.getEntities(URL.ENTITIES.SPECIALITY).then(function(data) {
                var specialities = [];
                angular.forEach(data, function(speciality) {
                    specialities[+speciality.speciality_id] = speciality.speciality_name;
                });
                return specialities;
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