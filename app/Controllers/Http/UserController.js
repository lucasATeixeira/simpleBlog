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

  async store({ request }) {
    const data = request.only(['name', 'bio', 'password', 'email']);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
