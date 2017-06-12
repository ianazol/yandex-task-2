process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;
const yamblz = require("../server/lib/yamblz");
const database = require("../server/database");

function createSchoolWithLecture() {
    return Promise.all([
        yamblz.classroom.add({name: "classroom 2", capacity: 200, description: "big classroom"}),
        yamblz.school.add({name: "school 1", count: 40}),
        yamblz.school.add({name: "school 2", count: 100})
    ])
        .then((results) => {
            return yamblz.lecture.add({
                name: "Лекция 1",
                lecturer: "Константин Константинопольский",
                start: "2017-03-27T17:00:00",
                finish: "2017-03-27T19:00:00",
                school: [results[1]._id, results[2]._id],
                classroom: results[0]._id
            });
        });
}

describe("school", function () {
    //id школы, для которой запланирована лекция
    let schoolWithLecture;

    before(function (done) {
        database.connect();
        createSchoolWithLecture()
            .then((lecture) => {
                schoolWithLecture = lecture.school[0];
                done();
            });
    });

    describe("add", function () {
        it("should return rejected promise if not all required fields are passed", function () {
            let requiredFields = ["name", "count"];
            let validData = {name: "Школа 1", count: 10};

            requiredFields.forEach((field) => {
                let invalidData = Object.assign({}, validData);
                delete invalidData[field];

                let promise = yamblz.school.add(invalidData);

                assert.isRejected(promise, Error, `Свойство ${field} не должно быть пустым`);
            });
        });

        it("should return rejected promise if school count is not a number", function () {
            let invalidData = {name: "Школа 1", count: 'десять'};
            let promise = yamblz.school.add(invalidData);
            assert.isRejected(promise, Error, `Количество студентов должно быть целым положительным числом`);
        });

        it("should return rejected promise if school count is not a integer number", function () {
            let invalidData = {name: "Школа 1", count: 10.5};
            let promise = yamblz.school.add(invalidData);
            assert.isRejected(promise, Error, `Количество студентов должно быть целым положительным числом`);
        });

        it("should return rejected promise if school count is negative value", function () {
            let invalidData = {name: "Школа 1", count: -10};
            let promise = yamblz.school.add(invalidData);
            assert.isRejected(promise, Error, `Количество студентов должно быть целым положительным числом`);
        });

        it("should create new object", function (done) {
            yamblz.school.add({name: "Школа 1", count: 10})
                .then((result) => {
                    assert.property(result, '_id');
                    done();
                });
        });
    });

    describe("getList", function () {
        it("should return resolved promise with array of objects", function (done) {
            yamblz.school.getList()
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
    });

    describe("update", function () {
        it("should return rejected promise if id is undefined", function (done) {
            let promise = yamblz.school.update();
            assert.isRejected(promise, Error, /Не передан id/).notify(done);
        });

        it("should return rejected promise if new count is not a number", function (done) {
            let promise = yamblz.school.update(schoolWithLecture, {count: "десять"});
            assert.isRejected(promise, Error, /Количество студентов должно быть целым положительным числом/).notify(done);
        });

        it("should return rejected promise if new count is not a integer number", function (done) {
            let promise = yamblz.school.update(schoolWithLecture, {count: 10.5});
            assert.isRejected(promise, Error, /Количество студентов должно быть целым положительным числом/).notify(done);
        });

        it("should return rejected promise if new count is not a positive value", function (done) {
            let promise = yamblz.school.update(schoolWithLecture, {count: -10});
            assert.isRejected(promise, Error, /Количество студентов должно быть целым положительным числом/).notify(done);
        });

        it("should return rejected promise if new count is more than capacity of the classroom in which lecture is scheduled", function (done) {
            let promise = yamblz.school.update(schoolWithLecture, {count: 150});
            assert.isRejected(promise, Error, /Нельзя увеличить количество участников школы/).notify(done);
        });

        it("should update data", function (done) {
            let data = {name: "newName", count: 100};

            yamblz.school.update(schoolWithLecture, data)
                .then((result) => {
                    assert.propertyVal(result, 'name', data.name);
                    assert.propertyVal(result, 'count', data.count);
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });
    });

    describe("remove", function () {
        let schoolId;

        before(function (done) {
            yamblz.school.add({name: "Школа 1", count: 10})
                .then((school) => {
                    schoolId = school._id;
                    done()
                });
        });

        it("should return rejected promise if id is undefined", function (done) {
            let promise = yamblz.school.remove();
            assert.isRejected(promise, Error, /Не передан id/).notify(done);
        });

        it("should return rejected promise if for this school are scheduled lectures", function (done) {
            let promise = yamblz.school.remove(schoolWithLecture);
            assert.isRejected(promise, Error, /Нельзя удалить школу, для которой запланированы лекции/).notify(done);
        });

        it("should delete school", function (done) {
            yamblz.school.remove(schoolId)
                .then((obj) => {
                    assert.propertyVal(obj.result, 'n', 1);
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

