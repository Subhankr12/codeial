const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      if (req.xhr) {
        // populate comment with name only
        comment = await comment
          .populate("user", "name")
          .populate("post", "_id")
          .execPopulate();

        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment Added",
        });
      }

      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error:", err);
    return;
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error:", err);
    return;
  }
};
