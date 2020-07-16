const { Router } = require('express');
const router = Router();


//Call User Database Model
var UsersModel = require('../../models/User.js');

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

module.exports = router;