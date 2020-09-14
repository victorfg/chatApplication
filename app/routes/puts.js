const { Router } = require('express');
const router = Router();

// Controller
const {
    updateUser
} = require("../controllers/putsController");


router.put("/updateUser",updateUser);

module.exports = router;