const { Router } = require('express');
const router = Router();

// Controller
const {
    postAutentificationMainPage,
    postRegistrarUsuario,
    postListaDeSalas
} = require("../controllers/postsController");

//Se gestiona el login mediante el lib/passport y segun vaya bien o no se redirecciona
router.post("/",postAutentificationMainPage);

router.post("/registrarUsuario",postRegistrarUsuario);

router.post("/listaDeSalas",postListaDeSalas);

module.exports = router;