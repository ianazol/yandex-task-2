"use strict";

const lecture = require("../controllers/lecture.controller");

module.exports = function (app) {
    app.route("/api/lecture")
        .get(lecture.list)
        .post(lecture.add);

    app.route("/api/lecture/:id")
        .delete(lecture.remove)
        .put(lecture.edit);
};