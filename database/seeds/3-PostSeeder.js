'use strict';

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');

class PostSeeder {
  async run() {
    const users = await User.query()
      .with('roles')
      .fetch();

    users.toJSON().forEach(async user => {
      const randomNumber = Math.round(Math.random() * 5);
      await Factory.model('App/Models/Post').createMany(randomNumber, {
        author_id: user.id,
      });
    });
  }
}

module.exports = PostSeeder;
