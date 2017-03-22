"use strict";

const mongoose = require("mongoose");

let mongoUri = process.env.MONGODB_URI || "mongodb://localhost/yamblz-schedule";
if (process.env.NODE_ENV === "test") {
    mongoUri = "mongodb://localhost/yamblz-schedule-test";
}

module.exports.connect = function () {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUri, function (error) {
        if (error) {
            console.error("Could not connect to MongoDB");
            console.log(error);
        }
    });
};

module.exports.disconnect = function () {
    mongoose.disconnect(function (error) {
        if (error) {
            console.log(error);
        }
    });
};