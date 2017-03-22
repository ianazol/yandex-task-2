"use strict";

const mongoose = require('mongoose');

let SchoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('School', SchoolSchema);