const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = (req, res) => {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);

  // Post.find({}, (err, posts) => {
  //   return res.render("home", {
  //     title: "Codeial | Home",
  //     posts: posts,
  //   });
  // });

  //populate the user of each post
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, posts) => {
      User.find({}, (err, users) => {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};
