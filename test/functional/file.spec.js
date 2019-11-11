'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Helpers = use('Helpers');

const { test, trait } = use('Test/Suite')('Post');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should be able to save a file', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('files')
    .loginVia(user)
    .attach('file', Helpers.tmpPath('test/avatar.jpeg'))
    .end();

  assert.exists(response.body.url);
});
