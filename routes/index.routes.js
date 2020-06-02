const { Router } = require('express');
const router = Router();

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

module.exports = router;
