const User = require("../models/user");

//render profile page
module.exports.profile = (req, res) => {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (user) {
        return res.render("user_profile", {
          title: "User profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

//render the sign up page
module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//render the sign in page
module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//get the sign up data
module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in finding user in signing up!");
      return;
    }

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("Error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//sign in and create session for the user
module.exports.createSession = (req, res) => {
  //Steps to authenticate
  //find the user
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in finding user in signing in");
      return;
    }

    //handle user found
    if (user) {
      // handle password which doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }

      //handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};
