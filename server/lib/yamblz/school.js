"use strict";

const School = require("../../models/school.model");
const Lecture = require("../../models/lecture.model");
const {validateRequiredFields, isPositiveInteger} = require("./helper");

/**
 * Добавить школу
 * @param {Object} schoolData
 * @param {String} schoolData.name - название школы
 * @param {Number} schoolData.count - количество участников
 * @returns {Promise}
 */
function add(schoolData = {}) {
    return validateNewSchoolData(schoolData)
        .then(() => {
            let school = new School(schoolData);
            return school.save();
        });
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
    return checkSchoolIsFree(id)
        .then(() => School.remove({_id: id}).exec());
}

/**
 * Изменить школу
 * @param {String} id
 * @param {Object} schoolData
 * @returns {Promise}
 */
function update(id, schoolData = {}) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }
    return validateUpdatedSchool(id, schoolData)
        .then(() => {
            return School.findOneAndUpdate({"_id": id}, {$set: schoolData}, {new: true}).exec();
        });
}

/**
 * Получить список всех школ
 * @returns {Promise}
 */
function getList() {
    return School.find().exec();
}

/**
 * Проверить переданные данные для новой школы
 * @param {Object} school
 * @returns {Promise}
 */
function validateNewSchoolData(school) {
    try {
        validateRequiredFields(school, ["name", "count"]);
        validateCount(school.count);
        return Promise.resolve(school);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Проверить новые данные для существующей школы
 * @param {String} id
 * @param {Object} schoolData
 * @returns {Promise}
 */
function validateUpdatedSchool(id, schoolData) {
    if (schoolData.count === undefined) {
        return Promise.resolve(schoolData);
    }
    return Promise.resolve()
        .then(() => validateCount(schoolData.count))
        .then(() => checkClassroomCapacity(id, schoolData));
}

/**
 * Проверить переданное значение количества студентов на целое положительное число
 * @param {String|Number} count
 */
function validateCount(count) {
    count = Number(count);
    if (!isPositiveInteger(count)) {
        throw new Error("Количество студентов должно быть целым положительным числом");
    }
}

/**
 * Проверить, что у школы нет запланированных лекций
 * @param {String} schoolId
 * @returns {Promise}
 */
function checkSchoolIsFree(schoolId) {
    return getLecturesBySchool(schoolId)
        .then((lectures) => {
            if (lectures.length > 0) {
                throw new Error("Нельзя удалить школу, для которой запланированы лекции");
            }
        });
}

/**
 * Проверить, что новое количество студентов школы не больше вместимости аудитории, в которых запланированы лекции
 * @param {String} schoolId
 * @param {Object} schoolData
 * @returns {Promise}
 */
function checkClassroomCapacity(schoolId, schoolData) {
    return getLecturesBySchool(schoolId)
        .then((lectures) => {
            lectures.forEach((lecture) => {
                let schools = replaceSchoolCountByNewValue(lecture.school, schoolId, schoolData.count);
                if (lecture.classroom.capacity < sumStudentsCount(schools)) {
                    throw new Error("Нельзя увеличить количество участников школы");
                }
            });
        });
}

/**
 * Обновить oldSchoolList новыми значениями
 * @param {Array} oldSchoolList
 * @param {String} replacedSchoolId - id школы,
 * @param {Number} newSchoolCount - новое количество студентов
 */
function replaceSchoolCountByNewValue(oldSchoolList, replacedSchoolId, newSchoolCount) {
    return oldSchoolList.map(school => {
        if (school._id.equals(replacedSchoolId)) {
            school.count = newSchoolCount;
        }
        return school;
    });
}

/**
 * Получить все лекции для конкретной школы
 * @param {String} schoolId
 * @returns {Promise}
 */
function getLecturesBySchool(schoolId) {
    return Lecture.find({"school": {$in: [schoolId]}}).populate("school classroom").exec();
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