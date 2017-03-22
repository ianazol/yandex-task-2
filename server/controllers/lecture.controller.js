"use strict";

const yamblz = require("../lib/yamblz");

function add(req, res) {
    yamblz.lecture.add(req.body)
        .then(function (lecture) {
            res.json(lecture);
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function remove(req, res) {
    yamblz.lecture.remove(req.params.id)
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
    yamblz.lecture.update(req.params.id, req.body)
        .then(function (lecture) {
            if (!lecture) {
                return res.send({
                    error: 'Лекция не найдена'
                });
            } else {
                res.json(lecture);
            }
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function list(req, res) {
    yamblz.lecture.getList(req.query)
        .then(function (lectures) {
            res.json(lectures);
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