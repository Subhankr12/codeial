{
  //method to submit the form data using ajax
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit((e) => {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: (data) => {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);

          deletePost($(" .delete-post-button", newPost));

          new Noty({
            theme: "relax",
            type: "success",
            text: "Post Published!",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in DOM
  let newPostDom = (post) => {
    return $(`<li id="post-${post._id}">
     <div>
       <small class="post-username">
       ${post.user.name}
       </small>
       <br />
       <small>
         <a class="delete-post-button" href="/posts/destroy/${post._id}"
           >Delete Post</a
         >
       </small>
       <div class="post-card">
       ${post.content}
       </div>
     </div>
     <div class="post-comments">

       <form action="/comments/create" method="POST">
         <input
           type="text"
           name="content"
           placeholder="Tap here to add comment..."
           required
         />
         <input type="hidden" name="post" value="${post._id}" />
         <input type="submit" value="Add Comment" />
       </form>
   
       <div class="post-comments-list">
         <ul id="post-comments-${post._id}">
         </ul>
       </div>
     </div>
   </li>
   `);
  };

  // method to delete a post from DOM
  let deletePost = (deleteLink) => {
    $(deleteLink).click((e) => {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: (data) => {
          $(`#post-${data.data.post_id}`).remove();

          new Noty({
            theme: "relax",
            type: "error",
            text: "Post and associated comments deleted!",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}
