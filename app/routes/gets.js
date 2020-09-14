const { Router } = require('express');
const router = Router();

// Controller
const {
    renderMainPage,
    renderRegistrarUsuario,
    renderListaDeSalas,
    renderSalaDeChatNoRegistrado,
    renderSalaDeChat,
    renderLogout
} = require("../controllers/getsController");

router.get("/",renderMainPage);

router.get("/registrarUsuario",renderRegistrarUsuario);

router.get("/listaDeSalas",renderListaDeSalas);

router.get("/salaDeChatNoRegistrado",renderSalaDeChatNoRegistrado);

router.get("/salaDeChat",renderSalaDeChat);

router.get("/logout",renderLogout);

module.exports = router;