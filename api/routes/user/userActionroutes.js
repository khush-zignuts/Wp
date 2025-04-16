const express = require("express");
const { userActionController } = require("../../controllers/index");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// Send a message
router.get("/getUser", authMiddleware, userActionController.getUser);

router.get("/getLoginUser", authMiddleware, userActionController.getLoginUser);

module.exports = router;
