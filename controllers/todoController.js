const { render } = require("ejs");
const db = require("../config/mongoose");
const Todo = require("../models/todo");

/* Render Home page */
module.exports.home = async function (req, res) {
  const todoList = await Todo.find({});
  return res.render("home", {
    title: "Todo",
    todoList,
  });
};

/* Add new todo */
module.exports.add = async function (req, res) {
  let { description, category, dueDate } = req.body;
  const isTaskDone = false;
  if (!dueDate) dueDate = "No Deadline";
  await Todo.create({
    description,
    category,
    dueDate,
    isTaskDone,
  });
  res.redirect("/");
};

/* Delete Todo */
module.exports.deleteTodos = async function (req, res) {
  let deleteTodosIds = req.body.deleteTodosIds;
  await Todo.deleteMany({ _id: deleteTodosIds });
  res.redirect("/");
};

/* Update Todo - Task done */
module.exports.updateTodo = async function (req, res) {
  let idToBeUpdated = req.body.idToBeUpdated;
  const todoToBeUpdate = await Todo.findById(idToBeUpdated);
  todoToBeUpdate.isTaskDone = !todoToBeUpdate.isTaskDone;
  await todoToBeUpdate.save();
  res.redirect("/");
};
