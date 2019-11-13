'use strict';
const Antl = use('Antl');
class Post {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required|accepted|unique:posts',
      body: 'required|accepted',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Post;
