const { Router } = require('express');
const router = Router();

// Controller
const {
    deleteRoom
} = require("../controllers/deletesController");


// Delete Notes
router.delete("/room/delete/:id", deleteRoom);

module.exports = router;