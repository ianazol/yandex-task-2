process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;
const yamblz = require("../server/lib/yamblz");
const database = require("../server/database");

describe("lecture", function () {
    let school100, school40, school140, classroom50, classroom200, classroom300;

    function clearLectureCollection() {
        const Lecture = require("../server/models/lecture.model");
        return Lecture.remove({}).exec();
    }

    before(function (done) {
        database.connect();

        //prepare data before testing
        Promise.all([
            yamblz.school.add({name: "school 1", count: 100}),
            yamblz.school.add({name: "school 2", count: 40}),
            yamblz.school.add({name: "school 2", count: 140}),
            yamblz.classroom.add({name: "classroom 1", capacity: 50, description: "small classroom"}),
            yamblz.classroom.add({name: "classroom 2", capacity: 200, description: "big classroom"}),
            yamblz.classroom.add({name: "classroom 3", capacity: 300, description: "another big classroom"})
        ])
            .then((results) => {
                [school100, school40, school140, classroom50, classroom200, classroom300] = results;
                done()
            });
    });

    describe("add", function () {
        before(function (done) {
            clearLectureCollection()
                .then(() => yamblz.lecture.add({
                    name: "Лекция 1",
                    lecturer: "Константин Константинопольский",
                    start: "2017-03-27T17:00:00",
                    finish: "2017-03-27T19:00:00",
                    school: school100._id,
                    classroom: classroom200._id
                }))
                .then(() => done());
        });

        it("should return rejected promise if not all required fields are passed", function () {
            let requiredFields = ["name", "lecturer", "start", "finish", "school", "classroom"];
            let validData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school40._id,
                classroom: classroom50._id
            };

            requiredFields.forEach((field) => {
                let invalidData = Object.assign({}, validData);
                delete invalidData[field];

                let promise = yamblz.lecture.add(invalidData);

                assert.isRejected(promise, Error, `Свойство ${field} не должно быть пустым`);
            });
        });

        it("should return rejected promise if the classroom capacity is less than the number of students in the school", function (done) {
            let data = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school100._id,
                classroom: classroom50._id
            };

            let promise = yamblz.lecture.add(data);
            assert.isRejected(promise, Error, /Вместимость аудитории меньше количества участников школы/).notify(done);
        });

        it("should return rejected promise if the classroom capacity is less than the number of students in all passed schools", function (done) {
            let data = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: [school100._id, school40._id],
                classroom: classroom50._id
            };

            let promise = yamblz.lecture.add(data);
            assert.isRejected(promise, Error, /Вместимость аудитории меньше количества участников школы/).notify(done);
        });

        it("should return rejected promise if another lecture is planned in this classroom at this time", function (done) {
            let data = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school40._id,
                classroom: classroom200._id
            };

            let promise = yamblz.lecture.add(data);
            assert.isRejected(promise, Error, /Аудитория в указанное время будет занята/).notify(done);
        });

        it("should return rejected promise if the school has another lecture at this time", function (done) {
            let data = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: [school40._id, school100._id],
                classroom: classroom300._id
            };

            let promise = yamblz.lecture.add(data);
            assert.isRejected(promise, Error, /У школы в указанное время будет другая лекция/).notify(done);
        });

        it("should return rejected promise if the start date is after the end date", function (done) {
            let data = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T21:00:00",
                finish: "2017-03-27T19:00:00",
                school: [school40._id, school100._id],
                classroom: classroom300._id
            };

            let promise = yamblz.lecture.add(data);
            assert.isRejected(promise, Error, /Начало лекции не может быть позже чем ее окончание/).notify(done);
        });

        it("should create new object", function (done) {
            let data = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                school: [school40._id, school100._id],
                classroom: classroom300._id,
                start: "2017-03-29T17:00:00",
                finish: "2017-03-29T19:00:00"
            };
            yamblz.lecture.add(data)
                .then((result) => {
                    assert.property(result, '_id');
                    done();
                })
                .catch((error) => {
                    assert.fail(error);
                    done();
                });
        });
    });

    describe("getList", function () {
        before(function (done) {
            let lectureData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school40._id,
                classroom: classroom50._id
            };

            yamblz.lecture.add(lectureData)
                .then(() => done());
        });

        it("should return resolved promise with array of objects", function (done) {
            yamblz.lecture.getList()
                .then((result) => {
                    assert.isArray(result);
                    assert.isAtLeast(result.length, 1);
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });

        it("should return resolved promise with array of lectures for this school in the specified period", function (done) {
            let query = {
                school: school100._id,
                from: "2017-03-25T00:00:00",
                to: "2017-03-31T00:00:00"
            };

            yamblz.lecture.getList(query)
                .then((result) => {
                    assert.isArray(result);
                    assert.isAtLeast(result.length, 1);
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });

        it("should return resolved promise with array of lectures in this classroom in the specified period", function (done) {
            let query = {
                classroom: classroom300._id,
                from: "2017-03-25T00:00:00",
                to: undefined
            };

            yamblz.lecture.getList(query)
                .then((result) => {
                    assert.isArray(result);
                    assert.equal(result.length, 1);
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });
    });

    describe("update", function () {
        beforeEach(function (done) {
            clearLectureCollection()
                .then(() => done());
        });

        it("should return rejected promise if the start date is after the end date", function (done) {
            let lectureData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school100._id,
                classroom: classroom200._id
            };

            let promise = yamblz.lecture.add(lectureData)
                .then((result) => {
                    return yamblz.lecture.update(result._id, {
                        start: "2017-03-30T17:00:00",
                    });
                });
            assert.isRejected(promise, Error, /Начало лекции не может быть позже чем ее окончание/).notify(done);
        });

        it("should return rejected promise if new classroom capacity is less than the number of students", function (done) {
            let lectureData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school100._id,
                classroom: classroom200._id
            };

            let promise = yamblz.lecture.add(lectureData)
                .then((result) => {
                    return yamblz.lecture.update(result._id, {
                        classroom: classroom50._id
                    });
                });
            assert.isRejected(promise, Error, /Вместимость аудитории меньше количества участников школы/).notify(done);
        });

        it("should return rejected promise if new school count is less than the classroom capacity", function (done) {
            let lectureData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school100._id,
                classroom: classroom200._id
            };

            let promise = yamblz.lecture.add(lectureData)
                .then((result) => {
                    return yamblz.lecture.update(result._id, {
                        school: [school100._id, school140._id]
                    });
                });
            assert.isRejected(promise, Error, /Вместимость аудитории меньше количества участников школы/).notify(done);
        });

        it("should return rejected promise if another lecture is planned in this classroom at this time", function (done) {
            let promise = Promise.all([
                yamblz.lecture.add({
                    name: "Лекция 1",
                    lecturer: "Константин Константинопольский",
                    start: "2017-03-27T17:00:00",
                    finish: "2017-03-27T19:00:00",
                    school: school100._id,
                    classroom: classroom200._id
                }),
                yamblz.lecture.add({
                    name: "Лекция 1",
                    lecturer: "Константин Константинопольский",
                    start: "2017-03-27T18:00:00",
                    finish: "2017-03-27T20:00:00",
                    school: school140._id,
                    classroom: classroom300._id
                }),
            ])
                .then((lectures) => {
                    return yamblz.lecture.update(lectures[1]._id, {
                        classroom: classroom200._id
                    });
                });
            assert.isRejected(promise, Error, /Аудитория в указанное время будет занята/).notify(done);
        });

        it("should return rejected promise if the school has another lecture at this time", function (done) {
            let promise = Promise.all([
                yamblz.lecture.add({
                    name: "Лекция 1",
                    lecturer: "Константин Константинопольский",
                    start: "2017-03-27T17:00:00",
                    finish: "2017-03-27T19:00:00",
                    school: school100._id,
                    classroom: classroom200._id
                }),
                yamblz.lecture.add({
                    name: "Лекция 1",
                    lecturer: "Константин Константинопольский",
                    start: "2017-03-27T18:00:00",
                    finish: "2017-03-27T20:00:00",
                    school: school140._id,
                    classroom: classroom300._id
                }),
            ])
                .then((lectures) => {
                    return yamblz.lecture.update(lectures[1]._id, {
                        school: school100._id
                    });
                });
            assert.isRejected(promise, Error, /У школы в указанное время будет другая лекция/).notify(done);
        });

        it("should update lecture", function (done) {
            let lectureData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school100._id,
                classroom: classroom200._id
            };

            let newLectureData = {
                start: "2017-03-28T17:00:00",
                finish: "2017-03-28T19:00:00",
                school: school140._id
            };

            yamblz.lecture.add(lectureData)
                .then((lecture) => yamblz.lecture.update(lecture._id, newLectureData))
                .then((result) => {
                    assert.equal(Date.parse(result.start), Date.parse(newLectureData.start));
                    assert.equal(Date.parse(result.finish), Date.parse(newLectureData.finish));
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });
    });

    describe("remove", function () {
        it("should return rejected promise if id is not specified", function (done) {
            let promise = yamblz.lecture.remove();
            assert.isRejected(promise, Error, /Не передан id/).notify(done);
        });

        it("should delete lecture", function (done) {
            let lectureData = {
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: school40._id,
                classroom: classroom200._id
            };

            yamblz.lecture.add(lectureData)
                .then((lecture) => yamblz.lecture.remove(lecture._id))
                .then((obj) => {
                    assert.propertyVal(obj.result, 'ok', 1);
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });
    });

    after(function () {
        database.disconnect();
    });
});