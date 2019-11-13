'use strict';

const { test, trait } = use('Test/Suite')('Following');

const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should be able to return a list of following authors', async ({
  client,
  assert,
}) => {
  const author = await Factory.model('App/Models/User').create();
  const user = await Factory.model('App/Models/User').create();

  await user.following().attach(author.id);

  const response = await client
    .get(`users/${user.id}/following`)
    .loginVia(user)
    .end();

  assert.equal(response.body[0].name, author.name);
  assert.equal(response.body[0].id, author.id);
});

test('It should be able to follow an author', async ({ client, assert }) => {
  const author = await Factory.model('App/Models/User').create();
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post(`users/${author.id}/following`)
    .loginVia(user)
    .end();

  response.assertStatus(201);

  const following = await user.following().first();

  assert.equal(following.id, author.id);
});

test('It should be able to unfollow an author', async ({ client, assert }) => {
  const author = await Factory.model('App/Models/User').create();
  const user = await Factory.model('App/Models/User').create();

  await user.following().attach(author.id);

  const response = await client
    .delete(`users/${author.id}/following`)
    .loginVia(user)
    .end();

  response.assertStatus(204);

  const following = await user.following().first();

  assert.isNull(following);
});

test('It should not be able to follow an author that is already followed', async ({
  client,
  assert,
}) => {
  const author = await Factory.model('App/Models/User').create();
  const user = await Factory.model('App/Models/User').create();

  await user.following().attach(author.id);

  const response = await client
    .post(`users/${author.id}/following`)
    .loginVia(user)
    .end();

  response.assertStatus(400);

  const following = await user.following().count(); // o método count retorna um array

  assert.equal(following[0]['count(*)'], 1); // esse array do método count foi acessado aqui
});
