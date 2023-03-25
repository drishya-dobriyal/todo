const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
  },
  {
    timeStamp: true,
  }
);

const Users = mongoose.model("User_todo", userSchema);

module.exports = Users;
