"use strict";

const Classroom = require("../../models/classroom.model");
const School = require("../../models/school.model");
const Lecture = require("../../models/lecture.model");
const {validateRequiredFields, leadZero} = require("./helper");
const {sumStudentsCount} = require("./school");

/**
 * Проверить вместимость аудитории
 * @param {Array} schoolIdList - массив id школ
 * @param {String} classroomId - id аудитории
 * @returns {Promise}
 */
function checkClassroomCapacity(schoolIdList, classroomId) {
    return Promise.all([
        Classroom.findById(classroomId).exec(),
        School.find({"_id": {$in: schoolIdList}}).exec()
    ])
        .then((results) => {
            let classroom = results[0];
            let schools = results[1];

            if (!classroom) {
                throw new Error("Аудитория не найдена");
            }

            if (schoolIdList.length !== schools.length) {
                throw new Error("Школа не найдена");
            }

            if (sumStudentsCount(schools) > classroom.capacity) {
                throw new Error("Вместимость аудитории меньше количества участников школы");
            }
        });
}

/**
 * Проверить, что в указанное время аудитория будет свободной
 * @param {String} id - id аудитории
 * @param {String} start - Дата начала планируемой лекции
 * @param {String} finish - Дата окончания планируемой лекции
 * @param {String} excludingLectureId - id лекции, которую надо исключить из поиска
 * @returns {Promise}
 */
function checkClassroomFree(id, start, finish, excludingLectureId) {
    return Lecture.find({
        $and: [
            {"_id": {$ne: excludingLectureId}},
            {"classroom": id},
            {"start": {$lt: finish}},
            {"finish": {$gt: start}},
        ]
    })
        .exec()
        .then((lectures) => {
            if (lectures.length > 0) {
                throw new Error("Аудитория в указанное время будет занята");
            }
        });
}

/**
 * Проверить, что в указанное время у школ не будет других лекций
 * @param {Array} school - id школы/школ
 * @param {String} start - Дата начала планируемой лекции
 * @param {String} finish - Дата окончания планируемой лекции
 * @param {String} excludingLectureId - id лекции, которую надо исключить из поиска
 * @returns {Promise}
 */
function checkSchoolFree(school, start, finish, excludingLectureId) {
    return Lecture.find({
        $and: [
            {"_id": {$ne: excludingLectureId}},
            {"school": {$in: school}},
            {"start": {$lt: finish}},
            {"finish": {$gt: start}},
        ]
    })
        .exec()
        .then((lectures) => {
            if (lectures.length > 0) {
                throw new Error("У школы в указанное время будет другая лекция");
            }
        });
}

/**
 * Валидация дат
 * @param {String} start
 * @param {String} finish
 * @returns {Promise}
 */
function validateDates(start, finish) {
    if (Date.parse(start) > Date.parse(finish)) {
        return Promise.reject(new Error("Начало лекции не может быть позже чем ее окончание"));
    }

    return Promise.resolve();
}

/**
 * Добавить лекцию
 * @param {Object} lectureData
 * @param {String} lectureData.name - название
 * @param {String} lectureData.lecturer - имя лектора
 * @param {String} lectureData.start - дата и время начала
 * @param {String} lectureData.finish - дата и время окончания
 * @param {Array|String} lectureData.school - id школы
 * @param {String} lectureData.classroom - id аудитории
 * @returns {Promise}
 */
function add(lectureData = {}) {
    let validationResult = validateRequiredFields(lectureData, ["name", "lecturer", "start", "finish", "school", "classroom"]);

    if (validationResult !== true) {
        return Promise.reject(validationResult);
    }

    if (!Array.isArray(lectureData.school)) {
        lectureData.school = [lectureData.school];
    }

    return validateDates(lectureData.start, lectureData.finish)
        .then(() => checkClassroomCapacity(lectureData.school, lectureData.classroom))
        .then(() => checkClassroomFree(lectureData.classroom, lectureData.start, lectureData.finish))
        .then(() => checkSchoolFree(lectureData.school, lectureData.start, lectureData.finish))
        .then(() => {
            let lecture = new Lecture(lectureData);
            return lecture.save()
                .then((lecture) => Lecture.populate(lecture, 'school classroom'));
        })
}

/**
 * Получить расписание по школам или аудиториям в указанный период
 * @param {Object} [query]
 * @param {String} [query.from] - дата начала периода
 * @param {String} [query.to] - дата окончания периода
 * @param {String} [query.school] - id школы
 * @param {String} [query.classroom] - id аудитории
 * @returns {Promise}
 */
function getList(query = {}) {
    if (query.from) {
        query.start = {$gte: query.from};
        delete query.from;
    }

    if (query.to) {
        query.finish = {$lte: query.to};
        delete query.to;
    }

    return Lecture.find(query).sort("start").populate("school classroom").exec();
}

/**
 * Обновить лекцию
 * @param {String} id
 * @param {Object} lectureData
 * @returns {Promise}
 */
function update(id, lectureData = {}) {
    let fullLectureData = {};

    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }

    if (lectureData.school !== undefined && !Array.isArray(lectureData.school)) {
        lectureData.school = [lectureData.school];
    }

    return Lecture.findById(id).exec()
        .then((result) => {
            fullLectureData = Object.assign(result, lectureData);
            return validateDates(fullLectureData.start, fullLectureData.finish);
        })
        .then(() => checkClassroomCapacity(fullLectureData.school, fullLectureData.classroom))
        .then(() => checkClassroomFree(fullLectureData.classroom, fullLectureData.start, fullLectureData.finish, id))
        .then(() => checkSchoolFree(fullLectureData.school, fullLectureData.start, fullLectureData.finish, id))
        .then(() => {
            return Lecture.findOneAndUpdate({"_id": id}, {$set: lectureData}, {new: true})
                .populate('school classroom')
                .exec();
        });
}

/**
 * Удалить лекцию
 * @param {String} id
 * @returns {Promise}
 */
function remove(id) {
    if (id === undefined) {
        return Promise.reject(new Error("Не передан id"));
    }

    return Lecture.remove({_id: id}).exec();
}

module.exports = {add, getList, update, remove};