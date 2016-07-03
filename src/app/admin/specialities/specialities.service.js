(function() {
    "use strict";

    angular.module("app.admin")
        .service("specialitiesService", specialitiesService);

    specialitiesService.$inject = ["URL", "MESSAGE", "coreEntityService", "helperService"];

    function specialitiesService(URL, MESSAGE, coreEntityService, helperService) {
        this.getSpecialities = getSpecialities;
        this.getSpecialityById = getSpecialityById;
        this.saveSpeciality = saveSpeciality;
        this.removeSpeciality = removeSpeciality;

        function getSpecialities() {
            return coreEntityService.getEntities(URL.ENTITIES.SPECIALITY).then(function(data) {
                return helperService.sortedEntityByProperty(data, "speciality_name");
            });
        }

        function getSpecialityById(speciality) {
            return coreEntityService.getEntityById(URL.ENTITIES.SPECIALITY, speciality.speciality_id).then(function(data) {
                return data;
            });
        }

        function saveSpeciality(speciality) {
            if (speciality.speciality_id === undefined) {
                return coreEntityService.addEntity(URL.ENTITIES.SPECIALITY, speciality).then(function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_ERROR);
                });
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.SPECIALITY, speciality.speciality_id, speciality).then(function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    helperService.showActionToast(MESSAGE.SAVE_ERROR);
                });
            }
        }

        function removeSpeciality(speciality) {
            return coreEntityService.removeEntity(URL.ENTITIES.SPECIALITY, speciality.speciality_id).then(function(response) {
                helperService.showActionToast(MESSAGE.DEL_SUCCESS);
            }, function(response) {
                helperService.showActionToast(MESSAGE.DEL_ERROR);
            });
        }
    }
}());