'use strict';

const { test, trait } = use('Test/Suite')('User Create');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('It should return at least name, password and email', async ({
  client,
  assert,
}) => {
  const userPayload = {
    name: 'Lucas',
    email: 'lucas.at.negocios@gmail.com',
    password: 'lucas',
  };

  const response = await client
    .post('/users')
    .send(userPayload)
    .end();

  response.assertStatus(200);
  assert.containsAllKeys(response.body, ['name', 'email', 'password']);
});
