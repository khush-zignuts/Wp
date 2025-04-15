const express = require("express");
const { userActionController } = require("../../controllers/index");

const router = express.Router();

// Send a message
router.get("/getUser", userActionController.getUser);

router.get("/getLoginUser", userActionController.getLoginUser);



module.exports = router;
