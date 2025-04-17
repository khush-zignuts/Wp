const express = require("express");
const { messageController } = require("../../controllers/index");
const checkUser = require("../../middlewares/authMiddleware");

const router = express.Router();

// Send a message
router.post("/send", checkUser, messageController.saveMessage);

// Get all messages between two users
router.get("get/:chatId", checkUser, messageController.getMessages);

// Delete a specific message
// router.delete("/:messageId", messageController.deleteMessage);

// Search messages between two users
// router.get("/search", messageController.searchMessages);

module.exports = router;
