{
  let createComment = () => {
    let newCommentForm = $("#new-comment-form");
    newCommentForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/comments/create",
        data: newCommentForm.serialize(),
        success: (data) => {
          let newComment = newCommentDom(data.data.comment);
          $(
            `.post-comments-list>#post-comments-${data.data.comment.post._id}`
          ).prepend(newComment);
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  let newCommentDom = (comment) => {
    return $(`<li id="comment-${comment.id}" class="comments-container">
      <p>
        <small>
          ${comment.user.name}
        </small>
        <br />
        <small>
          <a href="/comments/destroy/${comment.id}">Delete Comment</a>
        </small>
        ${comment.content}
      </p>
    </li>
    `);
  };
  createComment();
}
