document.addEventListener('DOMContentLoaded', () => {
  init();
});

const usersUrl = 'http://localhost:3000/users';

const postsUrl = 'http://localhost:3000/posts';

const likesUrl = `http://localhost:3000/likes`;

function init() {
  getUsers();
  getPosts();
  addTagEventListener();
  User.renderUserForm();
  Post.newPostEventListener();
}

function addTagEventListener() {
  const postUl = document.getElementsByClassName('tag-element');

  for (const i in postUl) {
    if (postUl[i].className) {
      console.log(postUl[i]);
      postUl[i].addEventListener('click', e => {
        sortPosts(e.target.innerText);
      });
    }
  }
}

function getUsers() {
  fetch(usersUrl)
    .then(res => res.json())
    .then(users => {
      console.log(users);
      users.forEach(user => {
        let userInstance = new User(user.id, user.username);
      });
    });
}

function getPosts() {
  fetch(postsUrl)
    .then(res => res.json())
    .then(posts => {
      renderPostPreview(posts);
    });
}

function sortPosts(e) {
  fetch(postsUrl)
    .then(res => res.json())
    .then(posts => {
      filterPosts(posts, e);
    });
}

function filterPosts(posts, e) {
  let container = document.querySelector('#post-info').children;
  if (e !== 'Home') {
    let filteredPosts = posts.filter(post => {
      return post.tags === e;
    });
    debugger;
    for (let i of container) {
      i.innerHTML = '';
    }
    renderPostPreview(filteredPosts);
  } else {
    for (let i of container) {
      i.innerHTML = '';
    }
    renderPostPreview(posts);
  }
}
function renderPostPreview(postArray) {
  postArray.forEach(post => {
    let postInstance = new Post(
      post.id,
      post.title,
      post.image,
      post.video,
      post.content,
      post.tags,
      post.link,
      post.likes,
      post.description,
      post.user_id
    );
    postInstance.renderPostPreview();
  });
}

// function newLike(user, post) {
//   let data = { user: user, post: user };
//   data;
//   fetch(likesUrl, {
//     method: `POST`,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }).then(res => res.json());
//   debugger;
// }
