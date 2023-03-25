const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/usersController.js");

router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);
router.get("/profile", passport.checkAuthentication, usersController.profile);

router.post("/create", usersController.create);
/* use passport as middleware */
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/" }),
  usersController.createSession
);

router.get("/log-out", usersController.destroySession);

module.exports = router;
