'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Post extends Model {
  author() {
    return this.belongsTo('App/Models/User', 'author_id', 'id');
  }

  avatar() {
    return this.belongsTo('App/Models/File', 'avatar_id', 'id');
  }
}

module.exports = Post;
