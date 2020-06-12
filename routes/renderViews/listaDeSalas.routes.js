const { Router } = require('express');
const router = Router();

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

module.exports = router;