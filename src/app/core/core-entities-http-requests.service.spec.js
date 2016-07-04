'use strict';

describe("Testing Core Entities Http Requests service", () => {
    var $httpBackend, BASE_URL, URL, coreEntityService;

    beforeEach(module("app.core"));
    beforeEach(module("app"));

    beforeEach(inject((_coreEntityService_) => {
        coreEntityService = _coreEntityService_;
    }));
    
    it("Should have initialize correctly", () => {
        expect(coreEntityService).toBeDefined();
    });

    it("Should have include all methods", () => {
        expect(coreEntityService.getEntities).toBeDefined();
        expect(coreEntityService.getEntitiesByEntityId).toBeDefined();
        expect(coreEntityService.getEntityById).toBeDefined();
        expect(coreEntityService.addEntity).toBeDefined();
        expect(coreEntityService.editEntity).toBeDefined();
        expect(coreEntityService.removeEntity).toBeDefined();
    });

    describe("Testing methods", () => {
        beforeEach(inject((_$httpBackend_, _BASE_URL_, _URL_) => {
            $httpBackend = _$httpBackend_;
            BASE_URL = _BASE_URL_;
            URL = _URL_;
        }));

        afterEach(() => {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it("Should get a entity by Id", () => {
            var faculty_id, faculty, expectedResult, actualResult;
            
            faculty_id = "1";
            faculty = {
                "faculty_id": faculty_id,
                "faculty_name": "Факультет геології",
                "faculty_description": "Про геологію"
            };
            expectedResult = faculty;
            
            $httpBackend.expectGET(BASE_URL + URL.ENTITIES.FACULTY + URL.GET_ENTITIES + faculty_id)
                .respond(faculty);

            actualResult = coreEntityService.getEntityById(URL.ENTITIES.FACULTY, faculty_id);

            actualResult.then((data) => {
                expect(angular.isObject(data)).toBeTruthy();
                expect(data).toEqual(expectedResult);
            });
            $httpBackend.flush();
        });
    });
    
});