/* eslint-disable no-undef */
const postId = window.location.href.split('=')[1];
const userImageEle = document.getElementById('user-Image');
const usernameEle = document.getElementById('username');
const dateEle = document.getElementById('date');
const contentEle = document.getElementById('content');
const postImageEle = document.getElementById('post-image');
const commentInput = document.getElementById('comment');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentContainer = document.getElementById('commentContainer');

fetch(`/post/${postId}`).then((res) => res.json()).then((res) => {
  if (res.has_image) {
    console.log(`/images/${res.userimage}`);
    userImageEle.src = `/images/${res.userimage}`;
  } else {
    userImageEle.src = res.userimage;
  }
  usernameEle.textContent = res.username;
  dateEle.textContent = res.curr_date;
  contentEle.textContent = res.content;
  // postImageEle.src = res.postimage;
});
const renderDom = (comment) => {
  const userImg = createElement('img', comment.userimage);
  const username = createElement('p', comment.username);
  const commentContent = createElement('p', comment.commentcontent);
  const div = createElement('div');
  div.append(userImg, username, commentContent);
  commentContainer.appendChild(div);
};

fetch(`/comments/${postId}`).then((data) => data.json()).then((comments) => {
  if (comments.length > 0) {
    comments.forEach((comment) => {
      renderDom(comment);
    });
  }
});
addCommentBtn.addEventListener('click', () => {
  const comment = commentInput.value;
  const packet = {
    method: 'POST',
    body: JSON.stringify({
      comment,
      postId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };
  fetch('/comment/add', packet).then((res) => res.json()).then((data) => {
    commentContainer.textContent = '';
    data.forEach((newComment) => {
      renderDom(newComment);
    });
  });
});
