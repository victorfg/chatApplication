const { Router } = require('express');
const router = Router();

// Controller
const {
    deleteUser
} = require("../controllers/deletesController");


router.delete("/user",deleteUser);