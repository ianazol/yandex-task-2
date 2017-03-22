/**
 * @module yamblz
 * @description Библиотека для работы с расписанием
 */
const school = require("./yamblz/school");
const lecture = require("./yamblz/lecture");
const classroom = require("./yamblz/classroom");

delete school.sumStudentsCount;

module.exports = {school, lecture, classroom};