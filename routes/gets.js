const { Router } = require('express');
const router = Router();

router.get('/', (req,res) =>{
    res.render('index', {
        title: 'Pagina Inicio',
        style: 'index.css',
        logo: 'logo.png',
        avatar: 'avatar.jpg',
        renderCanvasEffect:true
    });
});

router.get('/registrarUsuario', (req,res) =>{
    res.render('registroUsuario', {
        title: 'Registro Usuario',
        logo: 'logo.png',
        style: 'registrousuario.css'
    });
});

router.get('/listaDeSalas', (req,res) =>{
    res.render('listaDeSalas', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'listaDeSalas.css',
        roomNames: ['Apps','Games','Movies','Books','Newspapers','test2','test,4','test6']
    });
});

router.get('/salaDeChatNoRegistrado', (req,res) =>{
    res.render('salaDeChatNoRegistrado', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'salaDeChatNoRegistrado.css'
    });
});

router.get('/salaDeChat', (req,res) =>{
    res.render('salaDeChat', {
        title: 'Sala de Chat',
        logo: 'logo.png',
        style: 'salaDeChat.css',
        roomNames: ['Apps','Games','Movies','Books','Newspapers'],
        friendsNames: ['Juan','Maria','Pedro','Teresa','Sara'],
        avatar: 'avatar.jpg'
    });
});

router.get('/logout', (req,res) =>{
    req.logout();
    res.render('index', {
        title: 'Pagina Inicio',
        style: 'index.css',
        logo: 'logo.png',
        avatar: 'avatar.jpg',
        renderCanvasEffect:true
    });
});

/* GET SINGLE POST BY ID */
router.get('/user/:id', function (req, res, next) {
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
});

module.exports = router;