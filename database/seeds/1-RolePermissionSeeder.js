'use strict';

/*
|--------------------------------------------------------------------------
| RolePermission
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Role = use('Adonis/Acl/Role');
const Permission = use('Adonis/Acl/Permission');

class RolePermission {
  async run() {
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
  }
}

module.exports = RolePermission;
