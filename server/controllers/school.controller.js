"use strict";

const yamblz = require("../lib/yamblz");

function add(req, res) {
    yamblz.school.add(req.body)
        .then(function (school) {
            res.json(school);
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function remove(req, res) {
    yamblz.school.remove(req.params.id)
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
    yamblz.school.update(req.params.id, req.body)
        .then(function (school) {
            if (!school) {
                return res.send({
                    error: 'Школа не найдена'
                });
            } else {
                res.json(school);
            }
        })
        .catch(function (error) {
            return res.send({
                error: error.message
            });
        });
}

function list(req, res) {
    yamblz.school.getList()
        .then(function (schools) {
            res.json(schools);
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