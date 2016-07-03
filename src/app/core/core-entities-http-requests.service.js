(function() {
    "use strict";

    angular.module("app.core")
        .service("coreEntityService", coreEntityService);

    coreEntityService.$inject = ["$http", "BASE_URL", "URL"];

    function coreEntityService($http, BASE_URL, URL) {
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.getEntities = getEntities;
        // this.getEntitiesById = getEntitiesById;
        this.getEntitiesByEntityId = getEntitiesByEntityId;
        this.getEntityById = getEntityById;
        this.getEntitiesRange = getEntitiesRange;
        this.getEntitiesCount = getEntitiesCount;
        this.addEntity = addEntity;
        this.editEntity = editEntity;
        this.removeEntity = removeEntity;

        function successCallback(response) {
            return response.data;
        }

        function errorCallback(response) {
            return response;
        }

        function getEntities(entity) {
            return $http.get(BASE_URL + entity + URL.GET_ENTITIES)
                .then(successCallback, errorCallback);
        }

        function getEntitiesByEntityId(entity, getBy, entityId) {
            return $http.get(BASE_URL + entity + getBy + entityId)
                .then(successCallback, errorCallback);
        }
        
        function getEntityById(entity, entityId) {
            return $http.get(BASE_URL + entity + URL.GET_ENTITIES + entityId)
                .then(successCallback, errorCallback);
        }

        function getEntitiesRange(entity, currentRecordsRange) {
            return $http.get(BASE_URL + entity + URL.GET_ENTITY_RANGE +
                PAGINATION.ENTITIES_RANGE_ON_PAGE + "/" + currentRecordsRange)
                .then(successCallback, errorCallback);
        }

        function getEntitiesCount(entity, entityId) {
            return $http.get(BASE_URL + entity + URL.COUNT_ENTITY + entityId)
                .then(successCallback, errorCallback);
        }

        function addEntity(entity, entityObject) {
            return $http.post(BASE_URL + entity + URL.ADD_ENTITY, entityObject)
                .then(successCallback, errorCallback);
        }

        function editEntity(entity, entityId, entityObject) {
            return $http.post(BASE_URL + entity + URL.EDIT_ENTITY + entityId, entityObject)
                .then(successCallback, errorCallback);
        }

        function removeEntity(entity, entityId) {
            return $http.get(BASE_URL + entity + URL.REMOVE_ENTITY + entityId)
                .then(successCallback, errorCallback);
        }
    }
}());
