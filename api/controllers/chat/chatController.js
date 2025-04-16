const { Op } = require("sequelize");
const { Chat } = require("../../models/index");

// POST /api/chats/get-or-create
const getorcreate = async (req, res) => {
  const { user1Id, user2Id } = req.body;
 

  try {
    let chat = await Chat.findOne({
      where: {
        user1Id: user1Id,
        user2Id: user2Id,
      },
    });

    if (!chat) {
      chat = await Chat.create({
        user1Id: user1Id,
        user2Id: user2Id,
        createdAt: Math.floor(Date.now() / 1000),
        createdBy: user1Id,
      });

      return res.status(201).json({
        status: 201,
        message: "Chat created successfully.",
        data: chat,
        error: "",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Chat fetched successfully.",
        data: chat,
        error: "",
      });
    }
  } catch (error) {
    console.error("Chat get-or-create error:", error);
    return res.status(500).json({
      status: 500,
      message: "Failed to get or create chat",
      data: "",
      error: error.message || "Internal server error",
    });
  }
};

module.exports = {
  getorcreate,
};
