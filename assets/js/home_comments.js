class PostComments {
  //constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;

    //call for all existing comments
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pSelf = this;
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pSelf.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);

          pSelf.deleteComment($(" .delete-comment-button", newComment));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    return $(`<li id="comment-${comment._id}" class="comments-container">
      <p>
        <small>
          ${comment.user.name}
        </small>
        <br />

        <small>
          <a href="/comments/destroy/${comment._id}" class="delete-comment-button">Delete Comment</a>
        </small>

        ${comment.content}
      </p>
    </li>
    `);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}
