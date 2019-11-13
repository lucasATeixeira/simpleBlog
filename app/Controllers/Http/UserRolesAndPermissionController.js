'use strict';

const User = use('App/Models/User');

class UserRolesAndPermissionController {
  async show({ params }) {
    const user = await User.find(params.id);

    return {
      roles: await user.getRoles(),
      permissions: await user.getPermissions(),
    };
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id);
    const { permissions, roles } = request.only(['permissions', 'roles']);

    if (roles) {
      await user.roles().sync(roles);
    }

    if (permissions) {
      await user.permissions().sync(permissions);
    }

    await user.loadMany(['roles', 'permissions']);
  }
}

module.exports = UserRolesAndPermissionController;
