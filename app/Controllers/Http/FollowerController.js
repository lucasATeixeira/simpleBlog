'use strict';

const User = use('App/Models/User');

class FollowerController {
  async index({ params, request }) {
    const user = await User.find(params.id);
    const { page, perPage } = request.get();

    const followers = await user
      .followers()
      .orderBy('created_at')
      .paginate(page || 1, perPage || 5);

    return followers;
  }
}

module.exports = FollowerController;
