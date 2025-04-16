const express = require("express");
const { chatController } = require("../../controllers/index");

const router = express.Router();

// get or create new chat Id
router.post("/get-or-create", chatController.getorcreate);

module.exports = router;
