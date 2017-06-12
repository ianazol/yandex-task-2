"use strict";

const Classroom = require("../../models/classroom.model");
const Lecture = require("../../models/lecture.model");
const {validateRequiredFields, isPositiveInteger} = require("./helper");
const {sumStudentsCount} = require("./school");

/**
 * Добавить аудиторию
 * @param {Object} classroomData
 * @param {String} classroomData.name - название аудитории
 * @param {Number} classroomData.capacity - вместимость аудитории
 * @param {String} classroomData.description - описание
 * @returns {Promise}
 */
function add(classroomData = {}) {
    return validateNewClassroomData(classroomData)
        .then(() => {
            let classroom = new Classroom(classroomData);
            return classroom.save();
        });
}

/**
 * Удалить аудиторию
 * @param {String} id
 * @returns {Promise}
 */
function remove(id) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }
    return checkClassroomIsFree(id)
        .then(() => Classroom.remove({_id: id}).exec());
}

/**
 * Обновить аудиторию
 * @param {String} id
 * @param {Object} classroomData
 * @returns {Promise}
 */
function update(id, classroomData = {}) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }
    return validateUpdatedClassroom(id, classroomData)
        .then(() => {
            return Classroom.findOneAndUpdate({"_id": id}, {$set: classroomData}, {new: true}).exec();
        });
}

/**
 * Получить список всех аудиторий
 * @returns {Promise}
 */
function getList() {
    return Classroom.find().exec();
}

/**
 * Проверить переданные данные для новой аудитории
 * @param {Object} classroom
 * @returns {Promise}
 */
function validateNewClassroomData(classroom) {
    try {
        validateRequiredFields(classroom, ["name", "capacity", "description"]);
        validateCapacity(classroom.capacity);
        return Promise.resolve(classroom);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Проверить переданные данные для обновления аудитории
 * @param {String} id
 * @param {Object} classroomData
 * @returns {Promise}
 */
function validateUpdatedClassroom(id, classroomData) {
    if (classroomData.capacity === undefined) {
        return Promise.resolve(classroomData);
    }
    return Promise.resolve()
        .then(() => validateCapacity(classroomData.capacity))
        .then(() => checkClassroomCapacity(id, classroomData));
}

/**
 * Проверить вместимость аудитории на целое положительное значение
 * @param {Number|String} capacity
 */
function validateCapacity(capacity) {
    capacity = Number(capacity);
    if (!isPositiveInteger(capacity)) {
        throw new Error("Вместимость аудитории должно быть целым положительным числом");
    }
}

/**
 * Проверить, что в аудитории не запланированы лекции
 * @param {String} classroomId
 * @returns {Promise}
 */
function checkClassroomIsFree(classroomId) {
    return getLecturesByClassroom(classroomId)
        .then((lectures) => {
            if (lectures.length > 0) {
                throw new Error("Нельзя удалить аудиторию, в которой запланированы лекции");
            }
        });
}

/**
 * Проверить, что вместимость аудитории не меньше количества студентов
 * @param {String} id
 * @param {Object} classroom
 */
function checkClassroomCapacity(id, classroom) {
    return getLecturesByClassroom(id)
        .then((lectures) => {
            lectures.forEach((lecture) => {
                if (sumStudentsCount(lecture.school) > classroom.capacity) {
                    throw new Error("Нельзя уменьшить вместимость аудитории");
                }
            });
        });
}

/**
 * Получить все лекции, запланированные в конкретной аудитории
 * @param {String} classroomId
 * @returns {Promise}
 */
function getLecturesByClassroom(classroomId) {
    return Lecture.find({"classroom": classroomId}).populate("school").exec();
}

module.exports = {add, getList, remove, update};