"use strict";

const classroom = require("../controllers/classroom.controller");

module.exports = function (app) {
    app.route("/api/classroom/")
        .get(classroom.list)
        .post(classroom.add);

    app.route("/api/classroom/:id")
        .delete(classroom.remove)
        .put(classroom.edit);
};