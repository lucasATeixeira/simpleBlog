'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post');

class PostController {
  async index({ request, response, view }) {}

  async store({ request, auth }) {
    const data = request.only(['title', 'body']);

    const post = await Post.create({
      ...data,
      author: auth.user.id,
    });

    return post;
  }

  async show({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = PostController;
