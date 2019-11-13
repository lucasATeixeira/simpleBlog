'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
  static boot() {
    super.boot();

    this.addHook('afterCreate', 'PostHook.sendNewPostMail');

    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'title' },
      strategy: 'dbIncrement',
      disableUpdates: false,
    });
  }

  author() {
    return this.belongsTo('App/Models/User', 'author_id', 'id');
  }

  avatar() {
    return this.belongsTo('App/Models/File', 'avatar_id', 'id');
  }
}

module.exports = Post;
