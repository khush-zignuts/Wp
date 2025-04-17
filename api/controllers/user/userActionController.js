const express = require("express");
const router = express.Router();
const { User } = require("../../models/index"); // Your User model
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { HTTP_STATUS_CODES } = require("../../config/constant");

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
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        status: false,
        message: "User not found",
        data: "",
        error: "USER_NOT_FOUND",
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
      return res.status(HTTP_STATUS_CODES.OK).json({
        status: HTTP_STATUS_CODES.OK,
        message: "Users fetched successfully",
        data: users,
        error: "",
      });
    } else {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        status: HTTP_STATUS_CODES.NOT_FOUND,
        message: "No users found.",
        data: "",
        error: "NO_USERS_FOUND",
      });
    }
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      status: false,
      message: "Server error while fetching users",
      data: "",
      error: error.message || "Internal server error",
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
      return res.status(HTTP_STATUS_CODES.OK).json({
        status: true,
        message: "User fetched successfully",
        data: user,
        error: "",
      });
    } else {
      return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        status: false,
        message: "User not found",
        data: "",
        error: "USER_NOT_FOUND",
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(HTTP_STATUS_CODES.SERVER_ERROR).json({
      status: false,
      message: "Server error while fetching user",
      data: "",
      error: error.message || "Internal server error",
    });
  }
};

module.exports = {
  getUser,
  getLoginUser,
};
