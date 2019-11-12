'use strict';

const Kue = use('Kue');
const Job = use('App/Jobs/PostMail');

const PostHook = (exports = module.exports = {});

PostHook.sendNewPostMail = async postInstance => {
  const author = await postInstance.author().fetch();

  const followersSerialized = await author.followers().fetch();

  const followers = await followersSerialized.toJSON();

  if (!followers.length) return;

  followers.forEach(follower => {
    Kue.dispatch(Job.key, { user: follower, author, post: postInstance });
  });
};
