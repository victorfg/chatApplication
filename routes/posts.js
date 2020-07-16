const { Router } = require('express');
const router = Router();
var UserModel = require('../models/User.js');

router.post('/registrarUsuario', (req,res) =>{
    //return res.status(200).json(req.body);
    const User = new UserModel({
        name: req.body.nameInput,
        email: req.body.emailInput,
        password: req.body.passwordInput
    });

    User.save();
    res.redirect('/salaDeChat');
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