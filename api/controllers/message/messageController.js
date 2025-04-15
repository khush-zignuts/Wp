const { Message } = require("../../models/Message");
// const admin = require("firebase-admin");

const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Validate required fields
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({
        status: false,
        message: "Missing fields",
        data: "",
        error: "REQUIRED_FIELDS_MISSING",
      });
    }

    // Store message in DB
    const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp
    const message = await Message.create({
      senderId,
      receiverId,
      content,
      timestamp,
      isRead: false,
      isDelivered: false, // Message is initially not delivered
      deletedFor: [], // Initially, no one has deleted the message
      isDeletedForEveryone: false, // Message is not deleted for everyone
    });

    // Emit message using Socket.IO (if socket is available)
    req.io.to(receiverId).emit("private_message", {
      senderId,
      content,
      timestamp,
    });

    // Send push notification using FCM (optional)
    // Uncomment and use if FCM integration is needed
    /*
      const payload = {
        notification: {
          title: `New message from ${senderId}`,
          body: content,
        },
        data: {
          senderId: senderId.toString(),
          content,
        },
        token: req.body.receiverFcmToken, // Ensure the receiverFcmToken is sent in the request body
      };
  
      if (req.body.receiverFcmToken) {
        await admin.messaging().send(payload);
      }
      */

    return res.status(200).json({
      status: true,
      message: "Message sent successfully",
      data: message,
      error: "",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: "",
      error: error.message,
    });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId, deleteForEveryone } = req.body;

    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({
        status: false,
        message: "Message not found",
        error: "MESSAGE_NOT_FOUND",
      });
    }

    if (deleteForEveryone) {
      // Only sender can delete for everyone
      if (message.senderId !== userId) {
        return res.status(403).json({
          status: false,
          message: "Unauthorized",
          error: "ONLY_SENDER_CAN_DELETE_FOR_EVERYONE",
        });
      }

      message.isDeletedForEveryone = true;
      await message.save();

      return res.status(200).json({
        status: true,
        message: "Message deleted for everyone",
      });
    } else {
      if (!message.deletedFor.includes(userId)) {
        message.deletedFor.push(userId);
        await message.save();
      }

      return res.status(200).json({
        status: true,
        message: "Message deleted for you",
      });
    }
  } catch (error) {
    console.error("deleteMessage error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  deleteMessage,
};
