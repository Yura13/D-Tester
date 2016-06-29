(function() {
    "use strict";

    angular.module("app.admin")
        .service("facultiesService", facultiesService);

    facultiesService.$inject = ["$http", "$q", "BASE_URL", "URL", "PAGINATION", "coreEntityService"];

    function facultiesService($http, $q, BASE_URL, URL, PAGINATION, coreEntityService) {
        this.getFaculties = getFaculties;
        this.getFacultyById = getFacultyById;
        this.saveFaculty = saveFaculty;
        this.removeFaculty = removeFaculty;
        
        function getFaculties() {
            return coreEntityService.getEntities(URL.ENTITIES.FACULTY).then(function(data) {
                return data;
            });
        }

        function getFacultyById(faculty) {
            return coreEntityService.getEntityById(URL.ENTITIES.FACULTY, faculty.faculty_id).then(function(data) {
                return data;
            });
        }

        function saveFaculty(faculty) {
            if (faculty.faculty_id === undefined) {
                return coreEntityService.addEntity(URL.ENTITIES.FACULTY, faculty);
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.FACULTY, faculty.faculty_id, faculty);
            }
        }

        function removeFaculty(faculty) {
            return coreEntityService.removeEntity(URL.ENTITIES.FACULTY, faculty.faculty_id);
        }
    }
}());