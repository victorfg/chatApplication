var express = require('express');
var router = express.Router();

//Call User Database Model
var UsersModel = require('../models/User.js');

//CRUD
router.get('/users', function (req, res) {
    UsersModel.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
/* GET SINGLE POST BY ID */
router.get('/user/:id', function (req, res, next) {
    UsersModel.findById(req.params.id, function (err, post) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User Detail!', res, post);
        }
    });
});
router.post('/user', function (req, res, next) {
    console.log(req.body);

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    var data = UsersModel(userData);
    data.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            Response.successResponse('User saved!', res, userData);
        }
    })
});

router.delete('/user', function (req, res, next) {
    UsersModel.findByIdAndRemove(req.body._id, function (err, post) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User deleted!', res, post);
        }
    });
});

router.put('/user', function (req, res, next) {
    console.log(req.body._id);
    UsersModel.findByIdAndUpdate(req.body._id, req.body, function (err, put) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User updated!', res, put);
        }
    });
});