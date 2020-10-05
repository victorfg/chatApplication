const { Router } = require('express');
const router = Router();

// Controller
const {
    updatePending,
    updateUserRoom,
    updatePendingById,
    deleteRoom,
} = require("../controllers/putsController");

router.put("/updatePending",updatePending);

router.put("/updatePendingById",updatePendingById);

router.put("/updateUserRoom",updateUserRoom);

router.put("/deleteRoom",deleteRoom); //realmente hace un update para no matar el historico

router.put("/room/delete/:id", deleteRoom);

module.exports = router;