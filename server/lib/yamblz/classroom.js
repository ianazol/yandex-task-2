"use strict";

const Classroom = require("../../models/classroom.model");
const Lecture = require("../../models/lecture.model");
const {validateRequiredFields} = require("./helper");
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
    const validationResult = validateRequiredFields(classroomData, ["name", "capacity", "description"]);

    if (validationResult !== true) {
        return Promise.reject(validationResult);
    }

    classroomData.capacity = parseInt(classroomData.capacity);
    if (Number.isNaN(classroomData.capacity)) {
        return Promise.reject(new Error("Вместимость аудитории должно быть целым числом"));
    }

    let classroom = new Classroom(classroomData);
    return classroom.save();
}

/**
 * Получить список всех аудиторий
 * @returns {Promise}
 */
function getList() {
    return Classroom.find().exec();
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

    return Lecture.find({"classroom": id}).exec()
        //запрет на удаление аудитории, если в ней запланированы лекции
        .then((lectures) => {
            if (lectures.length > 0) {
                throw new Error("Нельзя удалить аудиторию, в которой запланированы лекции");
            }
        })
        .then(() => Classroom.remove({_id: id}).exec());
}

/**
 * Проверить новые данные
 * @param {String} id
 * @param {Object} classroomData
 * @returns {Promise}
 */
function validateClassroom(id, classroomData) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }

    if (classroomData.capacity === undefined) {
        return Promise.resolve(classroomData);
    } else {
        classroomData.capacity = parseInt(classroomData.capacity);
        if (Number.isNaN(classroomData.capacity)) {
            return Promise.reject(new Error("Вместимость аудитории должно быть целым числом"));
        }
    }

    //проверим, можно ли изменить вместимость аудитории, если в ней уже запланированы лекции
    return Lecture.find({"classroom": id}).populate("school").exec()
        .then((lectures) => {
            classroomData.capacity = parseInt(classroomData.capacity) || 0;
            lectures.forEach((lecture) => {
                if (sumStudentsCount(lecture.school) > classroomData.capacity) {
                    throw new Error("Нельзя уменьшить вместимость аудитории");
                }
            });
        });
}

/**
 * Обновить аудиторию
 * @param {String} id
 * @param {Object} classroomData
 * @returns {Promise}
 */
function update(id, classroomData = {}) {
    return validateClassroom(id, classroomData)
        .then(() => {
            return Classroom
                .findOneAndUpdate({"_id": id}, {$set: classroomData}, {new: true})
                .exec();
        });
}

module.exports = {add, getList, remove, update};