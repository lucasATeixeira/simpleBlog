'use strict';

const User = use('App/Models/User');

class UserController {
  async index({ request }) {
    const { page, perPage } = request.get();
    const users = await User.query()
      .with('avatar')
      .orderBy('created_at')
      .paginate(page || 1, perPage || 5);

    return users;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);

    return user;
  }

  async store({ request }) {
    const { permissions, roles, ...data } = request.only([
      'name',
      'bio',
      'password',
      'email',
      'permissions',
      'roles',
    ]);

    const user = await User.create(data);

    if (roles) {
      await user.roles().attach(roles);
    }

    if (permissions) {
      await user.permissions().attach(permissions);
    }

    await user.loadMany(['roles', 'permissions']);

    return user;
  }

  async update({ request, params }) {
    const user = await User.findOrFail(params.id);
    const data = request.only([
      'avatar_id',
      'name',
      'email',
      'password',
      'bio',
    ]);

    user.merge(data);

    await user.save();

    return user;
  }

  async destroy({ params }) {
    const user = await User.find(params.id);

    await user.delete();
  }
}

module.exports = UserController;
