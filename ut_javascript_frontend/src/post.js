class Post {
  constructor(
    id,
    title,
    image,
    video,
    content,
    tags,
    link,
    likes,
    description,
    user_id
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.video = video;
    this.content = content;
    this.tags = tags;
    this.link = link;
    this.likes = likes;
    this.description = description;
    this.user_id = user_id;
    Post.all.push(this);
  }

  renderPostPreview() {
    let postInfo = document.querySelector('#post-info');
    let postTitle = document.createElement('h2');
    let postDiv = document.createElement('div');
    let postImage = document.createElement('img');
    postImage.classList = 'previewPicture';
    let postDescription = document.createElement('p');
    postDescription.classList = 'post-description';
    let postTag = document.createElement('p');
    postTag.classList = 'post-tag';
    let postLikes = document.createElement('p');
    let likeBtn = document.createElement('button');
    likeBtn.addEventListener('click', () => {
      this.updateLikes(postLikes);
    });
    likeBtn.classList = 'like-btn ';
    let postBtn = document.createElement('button');
    postBtn.classList = 'post-btn btn btn-info';
    let postBreak1 = document.createElement('br');
    let postBreak2 = document.createElement('br');
    let postVideo = document.createElement('iframe');
    postVideo.width = 560;
    postVideo.height = 315;
    postVideo.frameBorder = 0;
    let deletePost = document.createElement('button');
    deletePost.innerText = 'Delete Post';
    deletePost.classList = 'btn btn-danger';
    deletePost.id = `delete-${this.id}`;
    deletePost.addEventListener('click', () => {
      this.deletePost(postDiv);
    });

    //create a container
    let picLikesContainer = document.createElement('div');
    picLikesContainer.classList = 'container';
    let row = document.createElement('div');
    row.classList = 'row';
    let row1 = document.createElement('div');
    row1.classList = 'col-sm row1';
    let row2 = document.createElement('div');
    row2.classList = 'col-sm col2';

    row1.appendChild(postImage);
    row2.append(postLikes, likeBtn);
    row.append(row1, row2);
    picLikesContainer.appendChild(row);

    postTitle.innerText = this.title;
    postImage.src = this.image;
    postDescription.innerText = this.description;

    let numberOfLikes = this.likes.length;
    postLikes.innerText = `Likes: ${numberOfLikes}`;
    postLikes.dataset.postId = this.id;
    postLikes.classList = 'plikes';
    likeBtn.innerText = 'Like';

    postTag.innerText = `Tag: ${this.tag}`;
    postBtn.innerText = 'Show Post';
    postDiv.toggle = false;

    postBtn.addEventListener('click', () => {
      postDiv.toggle = !postDiv.toggle;
      this.showPost(postDiv, postBtn, postVideo);
    });

    postDiv.append(
      postTitle,
      picLikesContainer,
      postDescription,
      postBtn,
      deletePost,
      postBreak1,
      postBreak2
    );

    postInfo.appendChild(postDiv);
  }

  newPost() {}

  showPost(postDiv, postBtn, postVideo) {
    if (postDiv.toggle) {
      this.renderFullPost(postDiv, postVideo);
      postBtn.innerText = 'Hide Post';
    } else {
      postBtn.innerText = 'Show Post';
      document.querySelector(`[data-video-id="${this.id}"]`).remove();
      document.querySelector(`[data-content-id="${this.id}"]`).remove();
    }
  }

  renderFullPost(postDiv, postVideo) {
    let postContent = document.createElement('p');
    postVideo.src = this.video;
    postContent.innerText = this.content;
    postContent.classList = 'post-content';

    postContent.dataset.contentId = this.id;
    postVideo.dataset.videoId = this.id;

    postDiv.append(postVideo, postContent);
  }

  static newPostEventListener() {
    document.querySelector('#new-post-form').addEventListener('submit', e => {
      Post.captureNewPostValues(e);
    });
  }

  static captureNewPostValues(e) {
    e.preventDefault();
    let user_id = parseInt(sessionStorage.user_id);

    let title = document.querySelector('#new-title').value;
    let image = document.querySelector('#new-image').value;
    let description = document.querySelector('#new-description').value;
    let content = document.querySelector('#new-content').value;
    let video = document.querySelector('#new-video').value;
    let link = document.querySelector('#new-link').value;
    let tags = document.querySelector('#new-tag').value;

    debugger;
    Post.createNewPost(
      title,
      image,
      description,
      content,
      video,
      link,
      tags,
      user_id
    );
    document.querySelector('#new-post-form').reset();
  }

  static createNewPost(
    title,
    image,
    description,
    content,
    video,
    link,
    tags,
    user_id
  ) {
    let data = {
      title: title,
      image: image,
      description: description,
      content: content,
      video: video,
      link: link,
      tags: tags,
      likes: [],
      user_id: user_id
    };

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(post => {
        const newPost = new Post(
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
        newPost.renderPostPreview();
      });
  }

  updateLikes(postLikes) {
    console.log(postLikes);
    let likes;
    likes = postLikes.innerText.split(' ')[1];
    postLikes.innerText = `Likes: ${++likes}`;
    let data = {
      user_id: sessionStorage.user_id,
      post_id: this.id
    };
    fetch(`http://localhost:3000/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(json => console.log(json));
  }

  deletePost(postDiv) {
    let data = {
      id: this.id
    };
    fetch(`http://localhost:3000/posts/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(postDiv.remove());
  }
  // new post addition
}
Post.all = [];