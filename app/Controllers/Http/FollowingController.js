'use strict';

const User = use('App/Models/User');

class FollowingController {
  async index({ params, request }) {
    const user = await User.find(params.id);
    const { page, perPage } = request.get();

    const following = await user.following().paginate(page || 1, perPage || 5);

    return following;
  }

  async store({ response, params, auth }) {
    const user = await auth.getUser();
    const { author_id } = params;

    const alreadyFollowing = await user
      .following()
      .orderBy('created_at')
      .where('author_id', author_id)
      .first();

    if (alreadyFollowing) {
      return response
        .status(400)
        .json({ error: 'You already follows that author' });
    }

    await user.following().attach(author_id);

    return response.status(201).send();
  }

  async destroy({ params, auth }) {
    const user = await auth.getUser();
    const { author_id } = params;

    await user.following().detach(author_id);
  }
}

module.exports = FollowingController;
