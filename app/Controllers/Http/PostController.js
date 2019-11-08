'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

class PostController {
  async index({ request }) {
    const posts = await Post.query()
      .with('author')
      .with('avatar')
      .fetch();

    return posts;
  }

  async store({ request, auth }) {
    const data = request.only(['title', 'body']);

    const post = await Post.create({
      ...data,
      author_id: auth.user.id,
    });

    return post;
  }

  async show({ params }) {
    const post = await Post.find(params.id);

    await post.load('author');

    return post;
  }

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PostController;
