const { Router } = require('express');
const passport = require('passport');
const router = Router();
var User = require('../models/User');

router.post('/', (req,res,next) => {
    passport.authenticate('local.signin',{
        successRedirect: '/listaDeSalas',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

router.post('/registrarUsuario', async (req,res) =>{
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
            //req.flash('error_msg', 'El email que has añadido ya esta siendo usado');
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
});

router.post('/user', function (req, res, next) {
    console.log(req.body);

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    var data = UsersModel(userData);
    data.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            Response.successResponse('User saved!', res, userData);
        }
    })
});

module.exports = router;