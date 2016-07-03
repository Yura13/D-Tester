(function () {
    "use strict";

    angular.module("app")
        .config(configApp);

    configApp.$inject = ["$stateProvider", "$urlRouterProvider", "$mdThemingProvider"];

    function configApp($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('indigo');
        
        $urlRouterProvider.otherwise("admin");

        $stateProvider
            .state("admin", {
                url: "/admin",
                templateUrl: "app/admin/home-admin.html",
                controller: "HomeAdminController as admin"
            })
            .state("admin.faculties", {
                url: "/faculties",
                template: "<faculties></faculties>"
            })
            .state("admin.specialities", {
                url: "/specialities",
                template: "<specialities></specialities>"
            })
            .state("admin.groups", {
                url: "/groups",
                template: "<groups></groups>"
            })
            .state("admin.groupsByEntity", {
                url: "/{entity}/{entity_id:int}/groups",
                template: "<groups></groups>"
            })
            .state("admin.students", {
                url: "/groups/{group_id:int}/students",
                templateUrl: "app/admin/groups/students/students.html",
                controller: "StudentsController as students"
            })
            .state("admin.subjects", {
                url: "/subjects",
                template: "<subjects></subjects>"
            })
            .state("admin.scheduleForEntity", {
                url: "/{entity}/{entity_id:int}/schedules",
                templateUrl: "app/admin/subjects/schedules/schedules.html",
                controller: "SchedulesController as schedules"
            })
            .state("admin.tests", {
                url: "/subjects/{subject_id:int}/tests",
                templateUrl: "app/admin/subjects/tests/tests.html",
                controller: "TestsController as tests"
            })
            .state("admin.questions", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}",
                templateUrl: "app/admin/subjects/tests/questions/questions.html",
                controller: "QuestionsController as questions"
            })
            .state("admin.answer", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}/question/{question_id:int}/answer",
                templateUrl: "app/admin/subjects/tests/questions/answer/answer.html",
                controller: "AnswerController as answer"
            })
            .state("admin.testDetails", {
                url: "/subjects/{subject_id:int}/tests/{test_id:int}/details",
                templateUrl: "app/admin/subjects/tests/test-details/test-details.html",
                controller: "TestDetailsController as testDetails"
            })
    }
}());

