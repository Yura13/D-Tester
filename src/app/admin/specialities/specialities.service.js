(function() {
    "use strict";

    angular.module("app.admin")
        .service("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["$http", "$q", "BASE_URL", "URL", "PAGINATION", "coreEntityService"];

    function specialitiesService($http, $q, BASE_URL, URL, PAGINATION, coreEntityService) {
        this.getSpecialities = getSpecialities;
        this.getSpecialityById = getSpecialityById;
        this.saveSpeciality = saveSpeciality;
        this.removeSpeciality = removeSpeciality;

        function getSpecialities() {
            return coreEntityService.getEntities(URL.ENTITIES.SPECIALITY).then(function(data) {
                return data;
            });
        }

        function getSpecialityById(speciality) {
            return coreEntityService.getEntityById(URL.ENTITIES.SPECIALITY, speciality.speciality_id).then(function(data) {
                return data;
            });
        }

        function saveSpeciality(speciality) {
            if (speciality.speciality_id === undefined) {
                return coreEntityService.addEntity(URL.ENTITIES.SPECIALITY, speciality);
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.SPECIALITY, speciality.speciality_id, speciality);
            }
        }

        function removeSpeciality(speciality) {
            return coreEntityService.removeEntity(URL.ENTITIES.SPECIALITY, speciality.speciality_id);
        }
    }

}());