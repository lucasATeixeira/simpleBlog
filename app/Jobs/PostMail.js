'use strict';

const Mail = use('Mail');
const Env = use('Env');

class PostMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'PostMail-job';
  }

  async handle({ user, author, post }) {
    const frontend = Env.get('FRONT_URL');
    const postUrl = `${frontend}/${post.slug}`;

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
