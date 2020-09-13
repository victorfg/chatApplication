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
    const rooms = await RoomModel.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
    res.render('listaDeSalas', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'listaDeSalas.css',
        nameUser:req.user.nameInput,
        roomsUser:rooms
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
    //const activeRoom = await RoomModel.findOne({ user: req.user.id });
    var myJSON = JSON.stringify(req.query);
    console.log("DEFINITIVO "+req.query.id);
    const activeRoom = await RoomModel.findOne({ _id: req.query.id });
    //const activeRoom = await RoomModel.findOne({ _id: req.user.id });
    //console.log("DEFINITIVO "+req.params.idRoom);
    res.render('salaDeChat', {
        title: 'Sala de Chat',
        logo: 'logo.png',
        style: 'salaDeChat.css',
        roomNames: ['Apps','Games','Movies','Books','Newspapers'],
        friendsNames: ['Juan','Maria','Pedro','Teresa','Sara'],
        avatar: 'avatar.jpg',
        activeRoom: activeRoom.nombreDeLaSala
    });
};

getsCtrl.renderLogout= (req, res) => {
    req.logout();
    res.redirect('/');
};

/* GET SINGLE POST BY ID */
/*router.get('/user/:id', function (req, res, next) {
    UsersModel.findById(req.params.id, function (err, post) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User Detail!', res, post);
        }
    });
});

router.get('/users', function (req, res) {
    UsersModel.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});*/

module.exports = getsCtrl;