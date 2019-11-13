'use strict';

const Permission = use('Adonis/Acl/Permission');

class PermissionController {
  async index({ request, auth }) {
    const permissions = Permission.all();

    return permissions;
  }

  async show({ request, param }) {
    const permission = Permission.find(param.id);

    return permission;
  }

  async store({ request }) {
    const data = request.only(['slug', 'name', 'description']);

    const permission = Permission.create(data);

    return permission;
  }

  async update({ request, param }) {
    const permission = Permission.find(param.id);

    const data = request.only(['slug', 'name', 'description']);

    permission.merge(data);

    await permission.save();

    return permission;
  }

  async destroy({ request, param }) {
    const permission = Permission.find(param.id);

    await permission.delete();
  }
}

module.exports = PermissionController;
