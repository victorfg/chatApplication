const User = require('../models/User');
const Room = require('../models/Room');
const Message = require('../models/Message');
const PendingModel = require('../models/Pending.js');
const FriendModel = require('../models/Friend.js');
const UserRoomModel = require('../models/UserRoom.js');

const postsController = require('./postsController.js');

const putCtrl = {};

putCtrl.updatePending = async(req, res, next) => {
    //const { pending_id, status} = req.body;
    const { from_user, to_user, status} = req.body;
    // var pendingItem = await PendingModel.findOne({_id: pending_id});
    // pendingItem = JSON.parse(JSON.stringify(pendingItem))

    if(status==='rejected' || status==='cancelled'){ //si se cancela o rechaza solo actualizamos ese registro
        await PendingModel.updateMany({from_user:from_user, to_user:to_user, status:'pending'},
            { $set: { status: status } });
    }

    if(status==='accepted'){ //si se acepta actualizamos todos los registros de ambos usuarios
        await PendingModel.updateMany({
            $or: [
                {
                    from_user:from_user, to_user:to_user, status:'pending'
                },
                {
                    to_user:from_user, from_user:to_user, status:'pending'
                },
            ]
        }, { $set: { status: status } });

        //save from user if non exists
        var fromUserItem = await FriendModel.findOne({user:pendingItem.from_user,friend:pendingItem.to_user });
        if(!fromUserItem){
            friendItem = new FriendModel({ user:pendingItem.from_user,friend:pendingItem.to_user }) ;
            friendItem.save();
        }

        //save to user if non exists
        var toUserItem = await FriendModel.findOne({ user:pendingItem.to_user, friend:pendingItem.from_user});
        if(!toUserItem){
            friendItem = new FriendModel({ user:pendingItem.to_user, friend:pendingItem.from_user}) ;
            friendItem.save();
        }
    }

    res.send(200);
};

putCtrl.updatePendingById = async(req, res, next) => {
    const { _id, status} = req.body;
    console.log(_id);
    var pendingItem = await PendingModel.findById(_id);
    pendingItem = JSON.parse(JSON.stringify(pendingItem))
    console.log(pendingItem)
    if(status==='rejected' || status==='cancelled'){
        await PendingModel.updateMany({from_user:pendingItem.from_user, to_user:pendingItem.to_user, status:'pending'},
            { $set: { status: status } });
    }
    console.log(pendingItem)
    if(status==='accepted'){
        await PendingModel.updateMany({
            $or: [
                {
                    from_user:pendingItem.from_user, to_user:pendingItem.to_user, status:'pending'
                },
                {
                    to_user:pendingItem.from_user, from_user:pendingItem.to_user, status:'pending'
                },
            ]
        }, { $set: { status: status } });

        //save from user if non exists
        var fromUserItem = await FriendModel.findOne({user:pendingItem.from_user,friend:pendingItem.to_user });
        if(!fromUserItem){
            friendItem = new FriendModel({ user:pendingItem.from_user,friend:pendingItem.to_user }) ;
            friendItem.save();
        }

        //save to user if non exists
        var toUserItem = await FriendModel.findOne({ user:pendingItem.to_user, friend:pendingItem.from_user});
        if(!toUserItem){
            friendItem = new FriendModel({ user:pendingItem.to_user, friend:pendingItem.from_user}) ;
            friendItem.save();
        }
    }

    res.send(200);
};


putCtrl.updateUserRoom = async(req, res, next) => {
    const { room, user ,in_room } = req.body;
    await UserRoomModel.findByIdAndUpdate(room, { in_room:in_room });
    await UserRoomModel.updateMany(
        {
            room:room, user:user
        }
    , { $set: { in_room: in_room } });

    res.send(200);
};

putCtrl.deleteRoom = async(req, res, next) => {
    var room  = req.body.room;
    if(!room){
        room = req.params.id
    }
    await Room.findByIdAndUpdate(room, { activated:false });
    req.flash("success_msg", "Sala eliminada correctamente");
    res.redirect("/listaDeSalas");
};

// deleteCtrl.deleteRoom= async(req, res) => {
//     await Room.findByIdAndDelete(req.params.id);
//     req.flash("success_msg", "Sala eliminada correctamente");
//     res.redirect("/listaDeSalas");
// };
module.exports = putCtrl;