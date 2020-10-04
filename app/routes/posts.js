const { Router } = require('express');
const router = Router();
const multer  = require('multer');
const path = require('path');

// Controller
const {
    postAutentificationMainPage,
    postRegistrarUsuario,
    postListaDeSalas,
    postSalaDeChatUpdateUser,
    postSalaListaDeSalasUpdateUser,
    postSaveMessage,
    savePending,
    saveFriend,
    saveUserRoom,
} = require("../controllers/postsController");

var storage = multer.diskStorage({
    destination: "./app/public/uploads/",
    filename: (req, file, cb)=> {
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})

var uploadFile = multer({
    storage: storage,
}).single('file');

//Se gestiona el login mediante el lib/passport y segun vaya bien o no se redirecciona
router.post("/",postAutentificationMainPage);

router.post("/registrarUsuario",uploadFile,postRegistrarUsuario);

router.post("/listaDeSalas",postListaDeSalas);

router.post("/salaDeChatUpdateUser",postSalaDeChatUpdateUser);

router.post("/salaListaDeSalasUpdateUser",postSalaListaDeSalasUpdateUser);

router.post("/saveMessage",postSaveMessage);

router.post("/savePending",savePending);

router.post("/saveFriend",saveFriend);

router.post("/saveUserRoom",saveUserRoom);

module.exports = router;