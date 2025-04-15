const express = require("express");
const { messageController } = require("../../controllers/index");

const router = express.Router();

// Send a message
router.post("/send", messageController.sendMessage);

// Get all messages between two users
// router.get("/chat/:senderId/:receiverId", messageController.getMessages);

// Delete a specific message
router.delete("/:messageId", messageController.deleteMessage);

// Search messages between two users
// router.get("/search", messageController.searchMessages);

module.exports = router;
