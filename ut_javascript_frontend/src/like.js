class Like {
  constructor(post, user) {
    this.user_id = user.id;
    this.post_id = post.id;
    Like.all.push(this);
  }

}

Like.all = [];
