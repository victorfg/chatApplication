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
    ).populate('user')
        .exec();

    let arrayNameFriends = getAllUserFriends.map((item)=>{
        return { _id:item.user._id  , _id:item.user.nameInput  }
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
    let arrayUsers = getAllUsersLessActive.map((item)=>{
        return { nameInput:item.nameInput, emailInput:item.emailInput, _id:item._id }
    });

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