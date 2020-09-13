var User = require('../models/User');
const putCtrl = {};

putCtrl.updateUser= (req, res, next) => {
    UsersModel.findByIdAndUpdate(req.body._id, req.body, function (err, put) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User updated!', res, put);
        }
    });
};

module.exports = putCtrl;