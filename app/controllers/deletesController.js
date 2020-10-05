var User = require('../models/User');
var Room = require('../models/Room');
const deleteCtrl = {};

// deleteCtrl.deleteRoom= async(req, res) => {
//     await Room.findByIdAndDelete(req.params.id);
//     req.flash("success_msg", "Sala eliminada correctamente");
//     res.redirect("/listaDeSalas");
// };

module.exports = deleteCtrl;