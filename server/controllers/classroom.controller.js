"use strict";

const yamblz = require("../lib/yamblz");

function add(req, res) {
    yamblz.classroom.add(req.body)
        .then(function (classroom) {
            res.json(classroom);
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function remove(req, res) {
    yamblz.classroom.remove(req.params.id)
        .then(function (result) {
            res.json(result);
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function edit(req, res) {
    yamblz.classroom.update(req.params.id, req.body)
        .then(function (classroom) {
            if (!classroom) {
                return res.send({
                    error: "Аудитория не найдена"
                });
            } else {
                res.json(classroom);
            }
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function list(req, res) {
    yamblz.classroom.getList()
        .then(function (classroom) {
            res.json(classroom);
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

module.exports = {
    add,
    remove,
    edit,
    list
};