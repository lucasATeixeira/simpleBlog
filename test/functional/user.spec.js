'use strict';

const { test, trait } = use('Test/Suite')('User');

const Factory = use('Factory');

const Hash = use('Hash');

const User = use('App/Models/User');

const Role = use('Adonis/Acl/Role');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should return all users', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .get('/users')
    .loginVia(user)
    .end();

  const usersLength = response.body.length - 1;

  assert.isArray(response.body);
  assert.equal(response.body[usersLength].name, user.name);
  assert.equal(response.body[usersLength].id, user.id);
  assert.equal(response.body[usersLength].email, user.email);
  assert.equal(response.body[usersLength].bio, user.bio);
});

test('It should return a single user', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client.get(`users/${user.id}`).end();

  assert.equal(response.body.name, user.name);
  assert.equal(response.body.id, user.id);
  assert.equal(response.body.email, user.email);
  assert.equal(response.body.bio, user.bio);
});

test('It should create user and return at least name, password and email', async ({
  client,
  assert,
}) => {
  const userPayload = {
    name: 'Lucas',
    email: 'lucas.at.negocios@gmail.com',
    password: 'lucas',
    password_confirmation: 'lucas',
  };

  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/users')
    .send(userPayload)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.containsAllKeys(response.body, ['name', 'email']);
});

test('It should update a user', async ({ client, assert }) => {
  const userPayload = {
    name: 'Nome atualizado',
    email: 'email@atualizado.com',
    bio: 'Bio atualizada',
    password: 'senha-atualizada',
    password_confirmation: 'senha-atualizada',
  };

  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .put(`users/${user.id}`)
    .loginVia(user)
    .send(userPayload)
    .end();

  const updatedUser = await User.findByOrFail('email', userPayload.email);

  const checkPassword = await Hash.verify(
    userPayload.password,
    updatedUser.password
  );

  assert.isTrue(checkPassword);
  assert.equal(response.body.name, updatedUser.name);
  assert.equal(response.body.id, updatedUser.id);
  assert.equal(response.body.email, updatedUser.email);
  assert.equal(response.body.bio, updatedUser.bio);
  assert.equal();
});

test('It should be able to delete a user', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const admin = await Role.create({
    slug: 'administrator',
    name: 'Administrador',
  });

  await user.roles().attach(admin.id);

  await client
    .delete(`users/${user.id}`)
    .loginVia(user)
    .end();

  const checkUser = await User.find(user.id);

  assert.isNull(checkUser);
});
