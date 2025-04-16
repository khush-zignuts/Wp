const express = require("express");
const { messageController } = require("../../controllers/index");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// Send a message
router.post("/send", authMiddleware, messageController.saveMessage);

// Get all messages between two users
router.get("/:chatId", authMiddleware, messageController.getMessages);

// Delete a specific message
// router.delete("/:messageId", messageController.deleteMessage);

// Search messages between two users
// router.get("/search", messageController.searchMessages);

module.exports = router;
