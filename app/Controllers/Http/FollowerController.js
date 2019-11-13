'use strict';

const User = use('App/Models/User');

class FollowerController {
  async index({ params }) {
    const user = await User.find(params.id);

    const followers = await user
      .followers()
      .orderBy('created_at')
      .fetch();

    return followers;
  }
}

module.exports = FollowerController;
