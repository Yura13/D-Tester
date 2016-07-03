(function() {
    "use strict";

    angular.module("app.admin")
        .service("subjectsService", subjectsService);

    subjectsService.$inject = ["URL", "MESSAGE", "coreEntityService", "$mdToast"];

    function subjectsService(URL, MESSAGE, coreEntityService, $mdToast) {
        this.getSubjects = getSubjects;
        this.getSubjectById = getSubjectById;
        this.saveSubject = saveSubject;
        this.removeSubject = removeSubject;

        function getSubjects() {
            return coreEntityService.getEntities(URL.ENTITIES.SUBJECT).then(function(data) {
                return data;
            });
        }

        function getSubjectById(subject) {
            return coreEntityService.getEntityById(URL.ENTITIES.SUBJECT, subject.subject_id).then(function(data) {
                return data;
            });
        }

        function saveSubject(subject) {
            if (subject.subject_id === undefined) {
                return coreEntityService.addEntity(URL.ENTITIES.SUBJECT, subject).then(function(response) {
                    showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    showActionToast(MESSAGE.SAVE_ERROR);
                });
            } else {
                return coreEntityService.editEntity(URL.ENTITIES.SUBJECT, subject.subject_id, subject).then(function(response) {
                    showActionToast(MESSAGE.SAVE_SUCCSES);
                }, function(response) {
                    showActionToast(MESSAGE.SAVE_ERROR);
                });
            }
        }

        function removeSubject(subject) {
            return coreEntityService.removeEntity(URL.ENTITIES.SUBJECT, subject.subject_id).then(function(response) {
                showActionToast(MESSAGE.DEL_SUCCESS);
            }, function(response) {
                showActionToast(MESSAGE.DEL_ERROR);
            });
        }

        function showActionToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
            );
        }
    }
}());