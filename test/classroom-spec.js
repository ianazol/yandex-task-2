process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const assert = chai.assert;
const yamblz = require("../server/lib/yamblz");
const database = require("../server/database");

function createClassroomWithLecture() {
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

describe("classroom", function () {
    let classroomWithLecture;

    before(function (done) {
        database.connect();

        createClassroomWithLecture()
            .then((lecture) => {
                classroomWithLecture = lecture.classroom;
                done();
            });
    });

    describe("add", function () {
        it("should return rejected promise if not all required fields are passed", function () {
            let requiredFields = ["name", "capacity", "description"];
            let validData = {name: "name", capacity: 10, description: "text"};

            requiredFields.forEach((field) => {
                let invalidData = Object.assign({}, validData);
                delete invalidData[field];

                let promise = yamblz.classroom.add(invalidData);

                assert.isRejected(promise, Error, `Свойство ${field} не должно быть пустым`);
            });
        });

        it("should create new object", function (done) {
            yamblz.classroom.add({name: "name", capacity: 10, description: "text"})
                .then((classroom) => {
                    assert.property(classroom, '_id');
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });
    });

    describe("getList", function () {
        it("should return resolved promise with array of classrooms", function (done) {
            yamblz.classroom.getList()
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
            let promise = yamblz.classroom.update();
            assert.isRejected(promise, Error, /Не передан id/).notify(done);
        });

        it("should return rejected promise if new capacity is less than the number of students at the lecture", function (done) {
            let promise = yamblz.classroom.update(classroomWithLecture, {capacity: 100});
            assert.isRejected(promise, Error, /Нельзя уменьшить вместимость аудитории/).notify(done);
        });

        it("should update classroom", function (done) {
            let newClassroomData = {
                name: "newName",
                capacity: 140,
                description: "another text"
            };

            yamblz.classroom.update(classroomWithLecture, newClassroomData)
                .then((result) => {
                    assert.propertyVal(result, 'name', newClassroomData.name);
                    assert.propertyVal(result, 'capacity', newClassroomData.capacity);
                    assert.propertyVal(result, 'description', newClassroomData.description);
                    done();
                })
                .catch((err) => {
                    assert.fail(err.message);
                    done();
                });
        });
    });

    describe("remove", function () {
        let classroomId;

        before(function (done) {
            yamblz.classroom.add({name: "name", capacity: 10, description: "text"})
                .then((classroom) => {
                    classroomId = classroom._id;
                    done()
                });
        });

        it("should return rejected promise if id is undefined", function (done) {
            let promise = yamblz.classroom.remove();
            assert.isRejected(promise, Error, /Не передан id/).notify(done);
        });

        it("should return rejected promise if lectures are scheduled in this classroom", function (done) {
            let promise = yamblz.classroom.remove(classroomWithLecture);
            assert.isRejected(promise, Error, /Нельзя удалить аудиторию, в которой запланированы лекции/).notify(done);
        });

        it("should delete classroom", function (done) {
            yamblz.classroom.remove(classroomId)
                .then((obj) => {
                    assert.propertyVal(obj.result, 'ok', 1);
                    assert.propertyVal(obj.result, 'n', 1);
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