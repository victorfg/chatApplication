const { Router } = require('express');
const router = Router();

//Call User Database Model
//var UsersModel = require('../models/User.js');

router.get('/', (req,res) =>{
    res.render('index', {
        title: 'Pagina Inicio',
        style: 'index.css',
        logo: 'logo.png',
        avatar: 'avatar.jpg'
    });
})

router.get('/registrarUsuario', (req,res) =>{
    res.render('registroUsuario', {
        title: 'Registro Usuario',
        logo: 'logo.png',
        style: 'registrousuario.css'
    });
})

router.get('/listaDeSalas', (req,res) =>{
    res.render('listaDeSalas', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'listaDeSalas.css',
        roomNames: ['Apps','Games','Movies','Books','Newspapers','test2','test,4','test6']
    });
})

//CRUD
router.get('/users', function (req, res) {
    UsersModel.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
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

router.delete('/user', function (req, res, next) {
    UsersModel.findByIdAndRemove(req.body._id, function (err, post) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User deleted!', res, post);
        }
    });
});

router.put('/user', function (req, res, next) {
    console.log(req.body._id);
    UsersModel.findByIdAndUpdate(req.body._id, req.body, function (err, put) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User updated!', res, put);
        }
    });
});*/

module.exports = router;
