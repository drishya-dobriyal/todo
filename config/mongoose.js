/* Require Library */
const mongoose = require("mongoose");
/* connect to database */
mongoose.connect("mongodb://localhost/todo_list_db");
/* accquire the connection */
const db = mongoose.connection;

/* Error  */
db.on("error", console.error.bind(console, "error with connetcion to db"));
/* Up and running */
db.once("open", function () {
  console.log("Successfully connected to database");
});
