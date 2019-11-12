'use strict';

const Mail = use('Mail');

class PostMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'PostMail-job';
  }

  async handle({ user, author, post }) {
    const postUrl = '';

    await Mail.send(
      ['emails.newPost'],
      {
        name: user.name,
        author_name: author.name,
        post_title: post.title,
        post_url: postUrl,
      },
      message => {
        message
          .to(user.email)
          .from('lucas.at.negocios@gmail.com Lucas Teixeira | ')
          .subject('Blog REAL - Novo Post');
      }
    );
  }
}

module.exports = PostMail;
