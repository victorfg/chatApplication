var User = require('../models/User');
const deleteCtrl = {};

deleteCtrl.deleteUser= (req, res, next) => {
    User.findByIdAndRemove(req.body._id, function (err, post) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User deleted!', res, post);
        }
    });
};

module.exports = deleteCtrl;