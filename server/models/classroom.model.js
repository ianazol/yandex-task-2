"use strict";

const mongoose = require('mongoose');

let ClassroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Classroom', ClassroomSchema);