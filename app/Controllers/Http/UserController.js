'use strict';

const User = use('App/Models/User');

class UserController {
  async index() {
    const users = await User.query()
      .with('posts')
      .with('avatar')
      .fetch();

    return users;
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);

    return user;
  }

  async store({ request }) {
    const data = request.only(['name', 'bio', 'password', 'email']);

    const user = await User.create(data);

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
