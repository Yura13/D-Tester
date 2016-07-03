(function() {
    "use strict";

    angular.module("app.admin")
        .service("groupsService", groupsService);

    groupsService.$inject = ["URL", "MESSAGE", "coreEntityService", "helperService"];

    function groupsService(URL, MESSAGE, coreEntityService, helperService) {
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
                return helperService.sortedEntityByProperty(data, "group_name");
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
                    return helperService.sortedEntityByProperty(data, "group_name");
                });
        }

        function getGroupsBySpeciality(speciality) {
            return coreEntityService.getEntitiesByEntityId(URL.ENTITIES.GROUP, URL.GET_GROUPS_BY_SPECIALITY, speciality.speciality_id)
                .then(function(data) {
                    return helperService.sortedEntityByProperty(data, "group_name");
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
                return coreEntityService.addEntity(URL.ENTITIES.GROUP, group).then(function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_ERROR);
                });
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.GROUP, group.group_id, group).then(function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_ERROR);
                });
            }
        }

        function removeGroup(group) {
            return coreEntityService.removeEntity(URL.ENTITIES.GROUP, group.group_id).then(function(response) {
                helperService.showActionToast(MESSAGE.DEL_SUCCESS);
            }, function(response) {
                helperService.showActionToast(MESSAGE.DEL_ERROR);
            });
        }
    }
}());