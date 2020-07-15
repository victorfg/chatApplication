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

router.get('/salaDeChatNoRegistrado', (req,res) =>{
    res.render('salaDeChatNoRegistrado', {
        title: 'Lista de Salas',
        logo: 'logo.png',
        style: 'salaDeChatNoRegistrado.css'
    });
})

module.exports = router;
