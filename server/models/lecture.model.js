"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LectureSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lecturer: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        default: Date.now,
        required: true
    },
    finish: {
        type: Date,
        default: Date.now,
        required: true
    },
    school: [{
        type: Schema.Types.ObjectId,
        ref: 'School'
    }],
    classroom: {
        type: Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

module.exports = mongoose.model('Lecture', LectureSchema);