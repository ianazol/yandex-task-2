"use strict";

const school = require("../controllers/school.controller");

module.exports = function (app) {
    app.route("/api/school")
        .get(school.list)
        .post(school.add);

    app.route("/api/school/:id")
        .delete(school.remove)
        .put(school.edit);
};