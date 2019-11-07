'use strict';

const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only(['name', 'bio', 'password', 'email']);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
