const { Router } = require('express');
const router = Router();

// Controller
const {
    updatePending,
    updateUserRoom,
    updatePendingById,
} = require("../controllers/putsController");

router.put("/updatePending",updatePending);

router.put("/updatePendingById",updatePendingById);

router.put("/updateUserRoom",updateUserRoom);

module.exports = router;