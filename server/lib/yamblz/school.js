"use strict";

const School = require("../../models/school.model");
const Lecture = require("../../models/lecture.model");
const {validateRequiredFields} = require("./helper");

/**
 * Добавить школу
 * @param {Object} schoolData
 * @param {String} schoolData.name - название школы
 * @param {Number} schoolData.count - количество участников
 * @returns {Promise}
 */
function add(schoolData = {}) {
    const validationResult = validateRequiredFields(schoolData, ["name", "count"]);

    if (validationResult !== true) {
        return Promise.reject(validationResult);
    }

    schoolData.count = parseInt(schoolData.count);
    if (Number.isNaN(schoolData.count)) {
        return Promise.reject(new Error("Количество студентов должно быть целым числом"));
    }

    let school = new School(schoolData);
    return school.save();
}

/**
 * Получить список всех школ
 * @returns {Promise}
 */
function getList() {
    return School.find().exec();
}

/**
 * Удалить школу
 * @param {String} id
 * @returns {Promise}
 */
function remove(id) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }

    return Lecture.find({"school": id}).exec()
        //запрет на удаление школы, для которой запланированы лекции
        .then((lectures) => {
            if (lectures.length > 0) {
                throw new Error("Нельзя удалить школу, для которой запланированы лекции");
            }
        })
        .then(() => School.remove({_id: id}).exec());
}

/**
 * Проверить, что новое количество студентов школы не больше вместимости аудитории, в которых запланированы лекции
 * @param {Array} schools
 * @param {Object} classroomCapacity
 * @param {String} schoolId - id школы
 * @param {Number} schoolCount - новое количество участников школы
 * @returns {boolean} - true если вместимсть аудитории >= количества студентов; иначе, false
 */
function checkClassroomCapacity(schools, classroomCapacity, schoolId, schoolCount) {
    schools.forEach((school) => {
        if (!school._id.equals(schoolId)) {
            schoolCount += school.count;
        }
    });

    return classroomCapacity >= schoolCount;
}

/**
 * Проверить новые данные
 * @param id
 * @param schoolData
 * @returns {Promise}
 */
function validateSchool(id, schoolData) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }

    if (schoolData.count === undefined) {
        return Promise.resolve(schoolData);
    } else {
        schoolData.count = parseInt(schoolData.count);
        if (Number.isNaN(schoolData.count)) {
            return Promise.reject(new Error("Количество студентов должно быть целым числом"));
        }
    }

    // проверим, можно ли изменить количество студентов
    return Lecture.find({"school": {$in: [id]}}).populate("school classroom").exec()
        .then((lectures) => {
            schoolData.count = parseInt(schoolData.count);
            lectures.forEach((lecture) => {
                if (!checkClassroomCapacity(lecture.school, lecture.classroom.capacity, id, schoolData.count)) {
                    throw new Error("Нельзя увеличить количество участников школы");
                }
            });
        });
}

/**
 * Изменить школу
 * @param {String} id
 * @param {Object} schoolData
 * @returns {Promise}
 */
function update(id, schoolData = {}) {
    return validateSchool(id, schoolData)
        .then(() => {
            return School.findOneAndUpdate({"_id": id}, {$set: schoolData}, {new: true}).exec();
        });
}

/**
 * Суммировать количество участников в школах
 * @param {Array} schools - массив школ
 * @returns {Number}
 */
function sumStudentsCount(schools) {
    return schools.reduce((acc, school) => acc + school.count, 0)
}

module.exports = {add, getList, remove, update, sumStudentsCount};