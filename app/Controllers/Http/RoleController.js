'use strict';

const Role = use('Adonis/Acl/Role');

class RoleController {
  async index() {
    const roles = await Role.query()
      .with('permissions')
      .fetch();

    return roles;
  }

  async show({ param }) {
    const role = await Role.find(param.id);

    await role.load('permissions');

    return role;
  }

  async store({ request }) {
    const { permissions, ...data } = request.only([
      'slug',
      'name',
      'description',
      'permissions',
    ]);

    const role = await Role.create(data);

    if (permissions) {
      await role.permissions().attach(permissions);
    }

    await role.load('permissions');

    return role;
  }

  async update({ request, param }) {
    const role = await Role.find(param.id);
    const { permissions, ...data } = request.only([
      'slug',
      'name',
      'description',
      'permissions',
    ]);

    role.merge(data);

    await role.save();

    if (permissions) {
      await role.permissions().sync(permissions);
    }

    await role.load('permissions');
  }

  async destroy({ param }) {
    const role = await Role.find(param.id);

    await role.delete();
  }
}

module.exports = RoleController;
