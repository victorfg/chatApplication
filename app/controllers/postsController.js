const passport = require('passport');

var User = require('../models/User');
var Room = require('../models/Room');
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
        const newUser = new User({nameInput, emailInput, passwordInput});
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

postsCtrl.postListaDeSalas= async(req, res, next) => {
    const { nombreDeLaSala } = req.body;
    const newRoom = new Room({ nombreDeLaSala });
    newRoom.user = req.user.id;
    console.log("newRoom "+newRoom);
    await newRoom.save();
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/listaDeSalas");
};

module.exports = postsCtrl;