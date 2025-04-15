const DataTypes = require("sequelize");
const sequelize = require("../config/db");
const CommonFields = require("./commonField");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "chat_id",
      references: {
        model: "one_to_one_chats",
        key: "id",
      },
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "sender_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "receiver_id",
      references: {
        model: "users",
        key: "id",
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_read",
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "read_at",
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_delivered",
    },
    deliveredAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "delivered_at",
    },
    deletedFor: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      allowNull: false,
      field: "deleted_for",
    },
    isDeletedForEveryone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_deleted_for_everyone",
    },

    ...CommonFields,
  },
  {
    tableName: "messages",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Message;
