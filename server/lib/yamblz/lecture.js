"use strict";

const Classroom = require("../../models/classroom.model");
const School = require("../../models/school.model");
const Lecture = require("../../models/lecture.model");
const {validateRequiredFields, wrapUpInArray} = require("./helper");
const {sumStudentsCount} = require("./school");

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
    lectureData.school = wrapUpInArray(lectureData.school);

    return validateNewLectureData(lectureData)
        .then(checkClassroomAndSchoolIsAvailable)
        .then(() => {
            let lecture = new Lecture(lectureData);
            return lecture.save();
        })
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

    if (lectureData.school !== undefined) {
        lectureData.school = wrapUpInArray(lectureData.school);
    }

    return fillWithOldData(id, lectureData)
        .then((result) => fullLectureData = result)
        .then(() => validateDates(fullLectureData.start, fullLectureData.finish))
        .then(() => checkClassroomAndSchoolIsAvailable(fullLectureData))
        .then(() => Lecture.findOneAndUpdate({"_id": id}, {$set: lectureData}, {new: true}).exec());
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
 * Проверить переданные данные для новой лекции
 * @param {Object} lecture
 * @returns {Promise}
 */
function validateNewLectureData(lecture) {
    try {
        validateRequiredFields(lecture, ["name", "lecturer", "start", "finish", "school", "classroom"]);
        validateDates(lecture.start, lecture.finish);
        return Promise.resolve(lecture);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Проверить аудиторию и школы
 * @param {Object} lecture
 * @returns {Promise}
 */
function checkClassroomAndSchoolIsAvailable(lecture) {
    return checkClassroomCapacity(lecture)
        .then(() => checkClassroomFree(lecture))
        .then(() => checkSchoolFree(lecture));
}

/**
 * Заполнить объект с новыми данными недостающей информацией из БД
 * @param {String} lectureID
 * @param {Object} newLectureData
 * @returns {Promise}
 */
function fillWithOldData(lectureID, newLectureData) {
    return Lecture.findById(lectureID).exec()
        .then((oldLectureData) => {
            return Object.assign(oldLectureData, newLectureData);
        });
}

/**
 * Проверить вместимость аудитории
 * @param {Array} school - массив id школ
 * @param {String} classroom - id аудитории
 * @returns {Promise}
 */
function checkClassroomCapacity({school, classroom}) {
    return Promise.all([
        Classroom.findById(classroom).exec(),
        School.find({"_id": {$in: school}}).exec()
    ])
        .then((results) => {
            let classroom = results[0];
            let schools = results[1];

            if (!classroom) {
                throw new Error("Аудитория не найдена");
            }

            if (school.length !== schools.length) {
                throw new Error("Школа не найдена");
            }

            if (sumStudentsCount(schools) > classroom.capacity) {
                throw new Error("Вместимость аудитории меньше количества участников школы");
            }
        });
}

/**
 * Проверить, что в указанное время аудитория будет свободной
 * @param {Object} lectureData
 * @returns {Promise}
 */
function checkClassroomFree(lectureData) {
    let {classroom, start, finish} = lectureData;
    let excludingLectureId = lectureData._id;

    return Lecture.find({
        $and: [
            {"_id": {$ne: excludingLectureId}},
            {"classroom": classroom},
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
 * @param {Object} lectureData
 * @returns {Promise}
 */
function checkSchoolFree(lectureData) {
    let {school, start, finish} = lectureData;
    let excludingLectureId = lectureData._id;

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
        throw new Error("Начало лекции не может быть позже чем ее окончание");
    }
}

module.exports = {add, getList, update, remove};