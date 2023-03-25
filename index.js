/* Require Modules */
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy.js");
const db = require("./config/mongoose.js");
const MongoStore = require("connect-mongo");

/* Create app */
const app = express();

/* Port For listening */
const port = 8000;

/* Config express to use body parser as middle ware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Use cookie parser */
app.use(cookieParser());

/* set view engine */
app.set("view engine", "ejs");
app.set("views", "./views");

/* Mongo db is use to store session key */
app.use(
  session({
    name: "todo",
    secret: "todo",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/todo_list_db",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
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
