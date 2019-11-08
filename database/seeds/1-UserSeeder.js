'use strict';

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');

class UserSeeder {
  async run() {
    await User.create({
      name: 'Lucas Teixeira',
      email: 'lucas.at.negocios@gmail.com',
      password: 'lucas',
      bio: 'Aqui vai minha Bio',
    });

    await Factory.model('App/Models/User').createMany(5);
  }
}

module.exports = UserSeeder;
