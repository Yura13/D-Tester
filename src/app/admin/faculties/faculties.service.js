(function() {
    "use strict";

    angular.module("app.admin")
        .service("facultiesService", facultiesService);

    facultiesService.$inject = ["URL", "MESSAGE", "coreEntityService", "helperService"];
    
    function facultiesService(URL, MESSAGE, coreEntityService, helperService) {
        this.getFaculties = getFaculties;
        this.getFacultyById = getFacultyById;
        this.saveFaculty = saveFaculty;
        this.removeFaculty = removeFaculty;
        
        function getFaculties() {
            return coreEntityService.getEntities(URL.ENTITIES.FACULTY).then(function(data) {
                var sorted = helperService.sortedEntityByProperty(data, "faculty_name");
                return sorted;
            });
        }

        function getFacultyById(faculty) {
            return coreEntityService.getEntityById(URL.ENTITIES.FACULTY, faculty.faculty_id).then(function(data) {
                return data;
            });
        }

        function saveFaculty(faculty) {
            if (faculty.faculty_id === undefined) {
                return coreEntityService.addEntity(URL.ENTITIES.FACULTY, faculty).then(function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_ERROR);
                });
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.FACULTY, faculty.faculty_id, faculty).then(function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_ERROR);
                });
            }
        }

        function removeFaculty(faculty) {
            return coreEntityService.removeEntity(URL.ENTITIES.FACULTY, faculty.faculty_id).then(function(response) {
                helperService.showActionToast(MESSAGE.DEL_SUCCESS);
            }, function(response) {
                helperService.showActionToast(MESSAGE.DEL_ERROR);
            });
        }
    }
}());