const { Router } = require('express');
const router = Router();


//Call User Database Model
var UsersModel = require('../../models/User.js');

router.delete('/user', function (req, res, next) {
    UsersModel.findByIdAndRemove(req.body._id, function (err, post) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User deleted!', res, post);
        }
    });
});