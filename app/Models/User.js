'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get traits() {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission',
    ];
  }

  static get hidden() {
    return ['password', 'token', 'token_created_at'];
  }

  posts() {
    return this.hasMany('App/Models/Post', 'id', 'author_id');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  avatar() {
    return this.belongsTo('App/Models/File', 'avatar_id', 'id');
  }

  followers() {
    return this.belongsToMany('App/Models/User', 'author_id', 'user_id', 'id')
      .pivotTable('followers')
      .withTimestamps();
  }

  following() {
    return this.belongsToMany('App/Models/User', 'user_id', 'author_id', 'id')
      .pivotTable('followers')
      .withTimestamps();
  }
}

module.exports = User;
