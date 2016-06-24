(function() {
    "use strict";

    angular.module("app")
        .constant("URL", {
            BASE_URL: "http://ec2-52-38-234-109.us-west-2.compute.amazonaws.com/",

            ENTITIES: {
                FACULTY:        "faculty",
                SPECIALITY:     "speciality",
                GROUP:          "group",
                STUDENT:        "student",
                SUBJECT:        "subject",
                TEST:           "test",
                TEST_DETAIL:    "testDetail",
                QUESTION:       "question",
                ANSWER:         "answer",
                RESULT:         "result",
                ADMINS:         "AdminUser",
                TIME_TABLE:     "timeTable",
                ENTITY_MANAGER: "EntityManager",
                TEST_PLAYER:    "TestPlayer",
                SANSWER:        "SAnswer"
            },

            ADD_ENTITY:                     "/insertData/",
            CHECK_ANSWERS:                  "/checkAnswers/",
            COUNT_ENTITY:                   "/countRecords/",
            COUNT_RECORDS_BY_TEST:          "/countRecordsByTest/",
            COUNT_TEST_PASSES_BY_STUDENT:   "/countTestPassesByStudent/",
            EDIT_ENTITY:                    "/update/",
            GET_ANSWERS_BY_QUESTION:        "/getAnswersByQuestion/",
            GET_DATA:                       "/getData/",
            GET_END_TIME:                   "/getEndTime/",
            GET_ENTITY_RANGE:               "/getRecordsRange/",
            GET_ENTITIES:                   "/getRecords/",
            GET_ENTITY_VALUES:              "/getEntityValues/",
            GET_RESULTS_BY_STUDENT:         "/getRecordsByStudent/",
            GET_RECORDS_RANGE_BY_TEST:      "/getRecordsRangeByTest/",
            GET_STUDENTS_BY_GROUP:          "/getStudentsByGroup/",
            GET_TEST_BY_SUBJECT:            "/getTestsBySubject/",
            GET_TEST_DETAILS:               "/getTestDetailsByTest/",
            GET_TIME_STAMP:                 "/getTimeStamp/",
            GET_QUESTIONS_BY_LEVEL_RAND:    "/getQuestionsByLevelRand/",
            GET_GROUPS_BY_FACULTY:          "/getGroupsByFaculty/",
            GET_GROUPS_BY_SPECIALITY:       "/getGroupsBySpeciality/",
            GET_SCHEDULE_FOR_GROUP:         "/getTimeTablesForGroup/",
            GET_SCHEDULE_FOR_SUBJECT:       "/getTimeTablesForSubject/",
            REMOVE_ENTITY:                  "/del/",
            RESET_SESSION_DATA:             "/resetSessionData/",
            SAVE_DATA:                      "/saveData/",
            SAVE_END_TIME:                  "/saveEndTime/"
        })

        .constant("PAGINATION", {
            ENTITIES_RANGE_ON_PAGE: 10,
            PAGES_SHOWN:            3,
            CURRENT_PAGE:           1
        })

        .constant("ENTITIES_UKR", {
            FACULTY:    "факультетів",
            SPECIALITY: "спеціальностей",
            GROUP:      "груп",
            STUDENT:    "студентів",
            SUBJECT:    "предметів",
            TEST:       "тестів"
        })

        .constant("MESSAGE", {
            SAVE_SUCCSES:       "Зміни збережено",
            SAVE_ERROR:         "Помилка. Зміни не збережено",
            DEL_CONFIRM:        "Ви підтверджуєте видалення?",
            EDIT_CONFIRM:       "Ви підтверджуєте збереження змін?",
            END_TEST_CONFIRM:   "Ви підтверджуєте завершення тестування?",
            DEL_SUCCESS:        "Видалення успішне",
            DEL_ERROR:          "Помилка видалення",
            DEL_SPEC_ERR:       "За цією спеціальністю існують групи. Спочатку видаліть їх.",
            DEL_DECLINE:        "Неможливо видалити самого себе"
        })
        
        .constant("TYPES_OF_QUESTION", {
            SIMPLE: {NAME: "Простий вибір", VALUE: "1"},
            MULTI: {NAME: "Мульти-вибір", VALUE: "2"}
        });

})();