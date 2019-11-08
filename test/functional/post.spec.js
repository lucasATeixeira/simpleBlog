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
      author_id: user.id,
    })
    .end();

  assert.exists(response.body);
  assert.containsAllKeys(response.body, ['title', 'body', 'author_id']);
});

test('It should be able to list all posts', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const post = await Factory.model('App/Models/Post').create({
    author_id: user.id,
  });

  const response = await client
    .get('posts')
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.equal(response.body[0].title, post.title);
  assert.equal(response.body[0].author_id, user.id);
  assert.equal(response.body[0].body, post.body);
});

test('It should be able to show a single post', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const post = await Factory.model('App/Models/Post').create({
    author_id: user.id,
  });

  const response = await client
    .get(`posts/${post.id}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, post.title);
  assert.equal(response.body.author_id, user.id);
  assert.equal(response.body.body, post.body);
});

// test('It should be able to update a post', async ({ client, assert }) => {
//   const postPayload = {
//     title: 'Título atualizado',
//   };

//   const user = await Factory.model('App/Models/User').create();

//   const post = await Factory.model('App/Models/Post').create({
//     author_id: user.id,
//   });

//   const response = await client
//     .put(`posts/${post.id}`)
//     .loginVia(user)
//     .send(postPayload)
//     .end();

//   const postHasBeenUpdated = response.body.title === postPayload.title;

//   response.assertStatus(200);
//   assert.isTrue(postHasBeenUpdated);
// });
