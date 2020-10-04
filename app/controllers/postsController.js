const passport = require('passport');
const url = require('url');

const User = require('../models/User');
const Room = require('../models/Room');
const Message = require('../models/Message');
const PendingModel = require('../models/Pending.js');
const FriendModel = require('../models/Friend.js');
const UserRoomModel = require('../models/UserRoom.js');

const postsCtrl = {};

postsCtrl.postAutentificationMainPage= (req, res, next) => {
    passport.authenticate('local.signin',{
        successRedirect: '/listaDeSalas',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
};

postsCtrl.postRegistrarUsuario= async (req, res, next) => {
    const { nameInput, emailInput, passwordInput, confirmpasswordInput} = req.body;
    const fileImage = req.file ? req.file.filename : null;
    const errors = [];
    const informativeText = [];
    if (nameInput.length <= 0) {
        errors.push({text: 'Por favor inserta un nombre'})
    }
    if (emailInput.length <= 0) {
        errors.push({text: 'Por favor inserta un email'})
    }
    if (passwordInput.length <= 0) {
        errors.push({text: 'Por favor inserta un password'})
    }
    if (confirmpasswordInput.length <= 0) {
        errors.push({text: 'Por favor inserta una confirmacion de password'})
    }
    if (passwordInput != confirmpasswordInput){
        errors.push({text: 'Passwords diferentes'})
    }
    if (passwordInput.length < 4){
        errors.push({text: 'El password deberia de ser al menos de 4 digitos'})
    }
    if(errors.length > 0){
        res.render('registroUsuario', {
            title: 'Registro Usuario',
            logo: 'logo.png',
            style: 'registrousuario.css',
            errors,nameInput,emailInput,passwordInput,confirmpasswordInput
        });
    } else {
        const emailUserRepeated = await User.findOne({emailInput: emailInput});
        if (emailUserRepeated){
            res.render('registroUsuario', {
                title: 'Registro Usuario',
                logo: 'logo.png',
                style: 'registrousuario.css',
                errors,nameInput,emailInput,passwordInput,confirmpasswordInput
            });
        }
        const newUser = new User({nameInput, emailInput, passwordInput, image:fileImage});
        await newUser.save();
        informativeText.push({text: 'Se ha creado el usuario Correctamente!'})
        res.render('index', {
            title: 'Pagina Inicio',
            style: 'index.css',
            logo: 'logo.png',
            avatar: 'avatar.jpg',
            renderCanvasEffect:true,
            informativeText
        });
    }
};

postsCtrl.postListaDeSalas = async(req, res, next) => {
    const nombreDeLaSala = req.body.nombreDeLaSala;
    const user = req.user.id;
    const isPublicRoom = req.body.radioButtonPublicRoom == "option1" ? true : false;

    const newRoom = new Room({ user:user,nombreDeLaSala: nombreDeLaSala,isPublicRoom: isPublicRoom });
    await newRoom.save();

    req.flash("success_msg", "Sala agregada correctamente");
    res.redirect("/listaDeSalas");
};

postsCtrl.postSalaDeChatUpdateUser= async(req, res, next) => {
    const { nameInput, emailInput} = req.body;
    const password = req.user.passwordInput;

    await User.findByIdAndUpdate(req.user._id, { nameInput, emailInput, password});

    res.redirect(url.format({
        pathname:"salaDeChat",
        query: {
           "id": req.body.idDeLaSala
         }
    }));
};

postsCtrl.postSalaListaDeSalasUpdateUser = async(req, res, next) => {
    const { nameInput, emailInput} = req.body;
    const password = req.user.passwordInput;

    await User.findByIdAndUpdate(req.user._id, { nameInput, emailInput, password});

    req.flash("success_msg", "Usuario actualizado correctamente");
    res.redirect("/listaDeSalas");
};

postsCtrl.postSaveMessage = async(req, res, next) => {
    const { idRoom, idUser, text, created_at} = req.body;
    messageItem = new Message({ room:idRoom, user:idUser, text:text, created_at:created_at});
    messageItem.save();

    res.send(200);
};

postsCtrl.savePending = async(req, res, next) => {
    const { from_user, to_user} = req.body;
    const status = 'pending';
    //comprobamos si existe una petición que esté pending o accepted.
    const userItem = await PendingModel.findOne(
        {
            $or: [
                {
                    from_user:from_user, to_user:to_user, status:'pending'
                },
                {
                    from_user:from_user, to_user:to_user, status:'accepted'
                },
            ]
        },
    );
    if(userItem){ //si existe devolvemos error
        res.send(200, {error:'existing pending found'});
        return;
    }
    pendingItem = new PendingModel({ from_user:from_user, to_user:to_user, status:status });
    pendingItem.save();

    var responseUser = await User.findOne({_id: to_user});
    responseUser = JSON.parse(JSON.stringify(responseUser))
    responseUser.status = status;
    res.send(200,responseUser);
};

postsCtrl.saveFriend = async(req, res, next) => {
    const { user, friend, is_blocked } = req.body;
    friendItem = new FriendModel({ user:user, friend:friend, is_blocked:is_blocked }) ;
    friendItem.save();

    res.send(200);
};

postsCtrl.saveUserRoom = async(req, res, next) => {
    const { user, room, in_room } = req.body;
    userItem = new FriendModel({ user:user, room:room, in_room:in_room }) ;
    userItem.save();

    res.send(200);
};



module.exports = postsCtrl;