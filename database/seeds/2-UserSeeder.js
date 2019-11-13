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

const Role = use('Adonis/Acl/Role');

class UserSeeder {
  async run() {
    const admin = await Role.query()
      .where('slug', 'administrator')
      .first();

    const adminUser = await User.create({
      name: 'Lucas Teixeira',
      email: 'lucas.at.negocios@gmail.com',
      password: 'lucas',
      bio: 'Aqui vai minha Bio',
    });

    await Factory.model('App/Models/User').createMany(5);

    await adminUser.roles().attach(admin.id);
  }
}

module.exports = UserSeeder;
