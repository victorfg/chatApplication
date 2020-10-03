const getsCtrl = {};

const UsersModel = require('../models/User.js');
const RoomModel = require('../models/Room.js');

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
        return { namePublicRoom:item.nombreDeLaSala }
    });
    // Obtenemos todas las salas privadas
    const getPrivateRooms = await RoomModel.find({ isPublicRoom: false, user: req.user.id });
    console.log("getPrivateRooms "+getPrivateRooms)
    let arrayPrivateRooms = getPrivateRooms.map((item)=>{
        return { namePrivateRoom:item.nombreDeLaSala }
    });
    // Obtenemos todos los usuarios menos el activo
    const getAllUsersLessActive = await UsersModel.find({ _id: {$ne:req.user.id }});
    let arrayUsers = getAllUsersLessActive.map((item)=>{
        return { nameInput:item.nameInput, emailInput:item.emailInput, _id:item._id }
    });

    res.render('salaDeChat', {
        title: 'Sala de Chat',
        style: 'salaDeChat.css',
        friendsNames: ['Juan','Maria','Pedro','Teresa','Sara'],
        activeRoom: activeRoom.nombreDeLaSala,
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