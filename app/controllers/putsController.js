const User = require('../models/User');
const Room = require('../models/Room');
const Message = require('../models/Message');
const PendingModel = require('../models/Pending.js');
const FriendModel = require('../models/Friend.js');
const UserRoomModel = require('../models/UserRoom.js');

const postsController = require('./postsController.js');

const putCtrl = {};

putCtrl.updatePending = async(req, res, next) => {
    const { pending_id, status} = req.body;
    await User.findByIdAndUpdate(pending_id, { status });

    if(status==='accepted'){
        const pendingItem = await PendingModel.findOne({_id: pending_id});
        req.body = null;

        //save from user
        req.body.user = pendingItem.from_user
        req.body.friend = pendingItem.to_user
        req.body.is_blocked = false;
        postsController.postsCtrl.saveFriend(req, res, next);

        //save to user
        req.body.user = pendingItem.to_user
        req.body.friend = pendingItem.from_user
        req.body.is_blocked = false;
        postsController.postsCtrl.saveFriend(req, res, next);
    }

    res.send(200);
};


putCtrl.updateUserRoom = async(req, res, next) => {
    const { room_id ,in_room } = req.body;
    await Room.findByIdAndUpdate(room_id, { in_room:in_room });

    res.send(200);
};

module.exports = putCtrl;