(function() {
    "use strict";

    angular.module("app")
        .service("coreEntityService", coreEntityService);

    coreEntityService.$inject = ["$http", "BASE_URL", "URL"];

    function coreEntityService($http, BASE_URL, URL) {
        this.getEntities = getEntities;
        // this.getEntitiesById = getEntitiesById;
        this.getEntityById = getEntityById;
        this.getEntitiesRange = getEntitiesRange;
        this.getEntitiesCount = getEntitiesCount;
        this.addEntity = addEntity;
        this.editEntity = editEntity;
        this.removeEntity = removeEntity;

        function _successCallback(response) {
            return response.data;
        }

        function _errorCallback(response) {
            return response;
        }

        function getEntities(entity) {
            return $http.get(BASE_URL + entity + URL.GET_ENTITIES)
                .then(_successCallback, _errorCallback);
        }
        
        function getEntityById(entity, entityId) {
            return $http.get(BASE_URL + entity + URL.GET_ENTITIES + entityId)
                .then(_successCallback, _errorCallback);
        }

        function getEntitiesRange(entity, currentRecordsRange) {
            return $http.get(BASE_URL + entity + URL.GET_ENTITY_RANGE +
                PAGINATION.ENTITIES_RANGE_ON_PAGE + "/" + currentRecordsRange)
                .then(_successCallback, _errorCallback);
        }

        function getEntitiesCount(entity, entityId) {
            return $http.get(BASE_URL + entity + URL.COUNT_ENTITY + entityId)
                .then(_successCallback, _errorCallback);
        }

        function addEntity(entity, entityObject) {
            return $http.post(BASE_URL + entity + URL.ADD_ENTITY, entityObject)
                .then(_successCallback, _errorCallback);
        }

        function editEntity(entity, entityId, entityObject) {
            return $http.post(BASE_URL + entity + URL.EDIT_ENTITY + entityId, entityObject)
                .then(_successCallback, _errorCallback);
        }

        function removeEntity(entity, entityId) {
            return $http.get(BASE_URL + entity + URL.REMOVE_ENTITY + entityId)
                .then(_successCallback, _errorCallback);
        }
    }
}());
