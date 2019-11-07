'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { test, trait } = use('Test/Suite')('Post');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should be able to create a post and return the informations', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('posts')
    .loginVia(user)
    .send({
      title: 'Meu primeiro post',
      body: 'Aqui vai um text para eu colocar no meu blog',
      author: user.id,
    })
    .end();

  assert.exists(response.body);
  assert.containsAllKeys(response.body, ['title', 'body', 'author']);
});
