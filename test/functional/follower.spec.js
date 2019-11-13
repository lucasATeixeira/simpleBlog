'use strict';

const { test, trait } = use('Test/Suite')('Follower');

const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should be able to return a list of followers', async ({
  client,
  assert,
}) => {
  const author = await Factory.model('App/Models/User').create();
  const user = await Factory.model('App/Models/User').create();

  await user.following().attach(author.id);

  const response = await client
    .get(`users/${author.id}/followers`)
    .loginVia(author)
    .end();

  assert.equal(response.body[0].name, user.name);
  assert.equal(response.body[0].id, user.id);
});
