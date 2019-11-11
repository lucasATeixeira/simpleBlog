'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { test, trait } = use('Test/Suite')('Session');

trait('Test/ApiClient');

test('it should return a jwt token', async ({ client, assert }) => {
  const sessionPayload = {
    email: 'lucas.teixeira@realcf.online',
    password: 'lucas',
  };

  await Factory.model('App/Models/User').create(sessionPayload);

  const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end();

  response.assertStatus(200);
  assert.exists(response.body.token);
});
