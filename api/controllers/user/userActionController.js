const express = require("express");
const router = express.Router();
const { User } = require("../../models/index"); // Your User model
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const getUser = async (req, res) => {
  try {
    const userId = req.user.dataValues.id;
    // Fetch the current user based on the provided token
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id"],
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Fetch all users except the logged-in user
    const users = await User.findAll({
      where: {
        id: {
          [Sequelize.Op.ne]: req.user.id,
        },
      },
      attributes: ["id", "name", "email", "isOnline"],
    });

    if (users && users.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Users fetched successfully",
        data: users,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "No users found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Server error",
      data: "",
      error: error.message,
    });
  }
};

const getLoginUser = async (req, res) => {
  try {
    const userid = req.user.dataValues.id;

    const user = await User.findOne({
      where: {
        id: userid,
      },
      attributes: ["id", "name", "status"],
    });

    if (user) {
      return res.status(200).json({
        status: true,
        message: "User fetched successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while fetching user",
      error: error.message,
    });
  }
};

module.exports = {
  getUser,
  getLoginUser,
};
