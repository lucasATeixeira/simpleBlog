'use strict';

class FollowerController {
  async index({ auth }) {
    const user = await auth.getUser();

    const followers = await user.followers().fetch();

    return followers;
  }
}

module.exports = FollowerController;
