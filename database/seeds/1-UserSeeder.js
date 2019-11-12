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
const Permission = use('Adonis/Acl/Permission');

class UserSeeder {
  async run() {
    const adminUser = await User.create({
      name: 'Lucas Teixeira',
      email: 'lucas.at.negocios@gmail.com',
      password: 'lucas',
      bio: 'Aqui vai minha Bio',
    });

    const users = await Factory.model('App/Models/User').createMany(5);

    const deleteUser = await Permission.create({
      slug: 'delete-user',
      name: 'Delete usuários',
    });

    const createPost = await Permission.create({
      slug: 'create-post',
      name: 'Criação de post',
    });

    const follow = await Permission.create({
      slug: 'follow',
      name: 'Seguir um autor',
    });

    const admin = await Role.create({
      slug: 'administrator',
      name: 'Administrador',
    });

    const writer = await Role.create({
      slug: 'writer',
      name: 'Escritor',
    });

    const reader = await Role.create({
      slug: 'reader',
      name: 'Leitor',
    });

    await admin.permissions().attach([deleteUser.id, createPost.id, follow.id]);

    await writer.permissions().attach([createPost.id, follow.id]);

    await reader.permissions().attach([follow.id]);

    await adminUser.roles().attach(admin.id);

    const options = {
      0: reader.id,
      1: writer.id,
    };

    users.forEach(async user => {
      const randomNumberBetwen0And1 = Math.round(Math.random()); // Math.round(Math.floor() * (2 - 1)) + 1;
      const roleId = options[randomNumberBetwen0And1];

      await user.roles().attach(roleId);
    });
  }
}

module.exports = UserSeeder;
