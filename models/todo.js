/* Require mongoose */
const mongoose = require("mongoose");

/* Create Schema for todo */
const todoSchema = new mongoose.Schema({
  description: {
    type: "String",
    required: true,
  },
  category: {
    type: "String",
    required: true,
  },
  dueDate: {
    type: "String",
    required: true,
  },
  isTaskDone: {
    type: "Boolean",
    required: true,
  },
});

/* Create Todo */
const Todo = mongoose.model("Contact", todoSchema);

module.exports = Todo;
