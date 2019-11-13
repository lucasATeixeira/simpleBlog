'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Post = use('App/Models/Post');

class PostController {
  async index({ request }) {
    const { page, perPage } = request.get();

    const posts = await Post.query()
      .with('author')
      .with('avatar')
      .orderBy('created_at')
      .paginate(page || 1, perPage || 5);

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
    const post = await Post.query()
      .where('slug', params.slug)
      .first();

    await post.load('author');

    return post;
  }

  async update({ request, params }) {
    const post = await Post.query()
      .where('slug', params.slug)
      .first();
    const data = request.only(['avatar_id', 'author_id', 'body', 'title']);

    post.merge(data);

    await post.save();

    return post;
  }

  async destroy({ params }) {
    const post = await Post.query()
      .where('slug', params.slug)
      .first();

    await post.delete();
  }
}

module.exports = PostController;
