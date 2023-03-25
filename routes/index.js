/* Require Express */
const express = require("express");
const db = require("../config/mongoose");
const Todo = require("../models/todo");

/* Require Router from express */
const router = express.Router();

/* Require Controller for todo*/
const todoController = require("../controllers/todoController");

/* Get gome page */
router.get("/", todoController.home);

/* Handler for add todo */
router.post("/addTodo", todoController.add);

/* Handler for delete todos */
router.post("/deleteTodos", todoController.deleteTodos);

/* Hanler for update todos */
router.post("/updateTodo", todoController.updateTodo);

/* Use Router  for Users */
router.use("/users", require("./users"));

/* Export router */
module.exports = router;
