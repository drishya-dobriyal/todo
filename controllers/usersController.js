const db = require("../config/mongoose");
const Users = require("../models/Users");
const { use } = require("../routes/users");

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signUp", {
    title: "Sign Up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signIN", {
    title: "Sign In",
  });
};

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "User Profile",
    user: "user",
  });
  /* if (req.cookies && req.cookies.user_id) {
    Users.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  } */
};

/* Create Sign Up */
module.exports.create = function (req, res) {
  console.log("Create: ", req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  Users.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user in  signing up");
      return;
    }

    if (!user) {
      console.log(req.body);
      Users.create(
        { email: req.body.email, password: req.body.password },
        function (err, user) {
          if (err) {
            console.log("Error in creating user while signing up : ", err);
            return;
          }
          return res.redirect("/users/sign-in");
        }
      );
    } else {
      return res.redirect("/users/sign-in");
    }
  });
};

/* Sign in */
module.exports.createSession = function (req, res) {
  console.log("create session ", req.body);
  return res.redirect("/");
  /* Users.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in");
      return;
    }
    if (user) {
      console.log(user, " = ", req.body.password);
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      return res.redirect("back");
    }
  }); */
};

module.exports.destroySession = function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      console.log("error while signing message");
      return;
    }
    return res.redirect("/users/sign-in");
  });
};
