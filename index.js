/* Require Modules */
const express = require("express");
const bodyParser = require("body-parser");

/* Create app */
const app = express();

/* Port For listening */
const port = 8000;

/* Config express to use body parser as middle ware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* set view engine */
app.set("view engine", "ejs");
app.set("views", "./views");

/* use static file */
app.use("/public", express.static("public"));

/* Use Router */
app.use("/", require("./routes"));

/* Listen to app */
app.listen(port, (err) => {
  if (err) {
    console.log(`Error while listening to server: ${err}`);
  }
  console.log(`App listenning to Port - ${port}`);
});
