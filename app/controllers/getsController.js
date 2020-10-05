const getsCtrl = {};

const UserModel = require('../models/User.js');
const RoomModel = require('../models/Room.js');
const MessageModel = require('../models/Message.js');
const PendingModel = require('../models/Pending.js');
const FriendModel = require('../models/Friend.js');
const UserRoomModel = require('../models/UserRoom.js');

var moment = require('moment');
//const dateFormatModule = require('./public/lib/date.format.js');

getsCtrl.renderMainPage= (req, res) => {
    res.render('index', {
        title: 'Pagina Inicio',
        style: 'index.css',
        logo: 'logo.png',
        avatar: 'avatar.jpg',
        renderCanvasEffect:true
    });
};

getsCtrl.renderRegistrarUsuario= (req, res) => {
    res.render('registroUsuario', {
        title: 'Registro Usuario',
        logo: 'logo.png',
        style: 'registrousuario.css'
    });
}; 

getsCtrl.renderListaDeSalas= async(req, res) => {
    const rooms = await RoomModel.find(
            {
                $or: [
                    {
                        user: req.user.id,
                        isPublicRoom: false
                    },
                    {
                        isPublicRoom: true
                    },
                ]
            },
        )
        .sort({ isPublicRoom: "asc",date: "desc" })
        .lean();
    res.render('listaDeSalas', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'listaDeSalas.css',
        roomsUser:rooms,
        userId:req.user._id,
        nameInput:req.user.nameInput,
        emailInput:req.user.emailInput,
        avatarImage: req.user.image
    });
}; 

getsCtrl.renderSalaDeChatNoRegistrado= (req, res) => {
    res.render('salaDeChatNoRegistrado', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'salaDeChatNoRegistrado.css'
    });
};

getsCtrl.renderSalaDeChat= async(req, res) => {
    const activeRoom = await RoomModel.findOne({ _id: req.query.id });
    // Obtenemos todas las salas públicas
    const getPublicRooms = await RoomModel.find({ isPublicRoom: true });
    let arrayPublicRooms = getPublicRooms.map((item)=>{
        return { id:item._id, namePublicRoom:item.nombreDeLaSala }
    });
    // Obtenemos todas las salas privadas
    const getPrivateRooms = await RoomModel.find({ isPublicRoom: false, user: req.user.id });
    let arrayPrivateRooms = getPrivateRooms.map((item)=>{
        return { id:item._id, namePrivateRoom:item.nombreDeLaSala }
    });

    //obtenemos amigos
    const getAllUserFriends = await FriendModel.find(
        {user: req.user.id}
    ).populate('friend')
        .exec();

    let arrayNameFriends = getAllUserFriends.map((item)=>{
        return { _id:item.friend._id  , nameInput:item.friend.nameInput  }
    });

    let arrayFriends = getAllUserFriends.map((item)=>{
        return { _id:item.user._id }
    });
    arrayFriends.push(req.user.id);

    //Obtenemos todos los usuarios que no sean amigos y que tampoco sea nuestro usuario
    const getAllUsersLessActive = await UserModel.find(
            {
                _id: {$nin: arrayFriends}
            }
        );

    var myPendingItems =  await PendingModel.find(
        {
            to_user: req.user.id,
            status: 'pending',
        }
    )
        .populate('from_user')
        .exec();

    myPendingItems = myPendingItems.map((item)=>{
            return { _id:item._id ,fromUserid:item.from_user._id, fromUserName:item.from_user.nameInput}
        }
    );


    var pendingItems = await PendingModel.find(
            {
                from_user: {$in: arrayFriends},
                status: 'pending',
            }
        )
        .populate('to_user')
        .exec()
    pendingItems = pendingItems.map((item)=>{
            return { _id:item.to_user._id , status:item.status}
        }
    );

    const arrayUsers = getAllUsersLessActive.map((item)=>{
        var status = 'not-pending';
        var pending = false;
        pendingItems.forEach( function(value) {
            if(value._id.toString()===item._id.toString()){
                status = 'pending';
                pending = true;
            }
        });
        return { nameInput:item.nameInput, emailInput:item.emailInput, _id:item._id , status: status, pending:pending }
    });

   // console.log(arrayUsers)
    // let arrayUsers = getAllUsersLessActive.map((item)=>{
    //     var status = 'not-pending';
    //     var pending = false;
    //     var pendingItem = PendingModel.findOne({from_user:req.user.id, to_user:item._id , status:'pending'});
    //     pendingItem.count({}, function( err, count){
    //         pending = count > 0;
    //         return { nameInput:item.nameInput, emailInput:item.emailInput, _id:item._id , status: status, pending:pending} // not-pending / pending
    //     })
    // });
    //Obtain messages
    const getAllMessagesForThisRoom = await MessageModel.find({room: req.query.id})
        .populate('user')
        .exec();

    let arrayMessages = getAllMessagesForThisRoom.map((item)=>{
        var fomatted_date = moment(item.created_at).calendar();
        return { date: fomatted_date,username: item.user.nameInput, text:item.text};
    });

    res.render('salaDeChat', {
        title: 'Sala de Chat',
        style: 'salaDeChat.css',
        friendsNames: arrayNameFriends,
        arrayMessages: arrayMessages,
        activeRoom: activeRoom.nombreDeLaSala,
        activeRoomPublic: activeRoom.isPublicRoom,
        idRoom: activeRoom._id,
        myPendingItems: myPendingItems,
        nameInput:req.user.nameInput,
        emailInput:req.user.emailInput,
        idDeLaSala:req.query.id,
        allUsers:arrayUsers,
        avatarImage: req.user.image,
        idUser: req.user._id,
        arrayPublicRooms:arrayPublicRooms,
        arrayPrivateRooms:arrayPrivateRooms
    });
};

getsCtrl.renderLogout= (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = getsCtrl;