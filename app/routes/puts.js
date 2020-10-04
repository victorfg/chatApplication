const { Router } = require('express');
const router = Router();

// Controller
const {
    updatePending,
    updateUserRoom,
} = require("../controllers/putsController");

router.put("/updatePending",updatePending);

router.put("/updateUserRoom",updateUserRoom);

module.exports = router;