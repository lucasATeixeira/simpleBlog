'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { test, trait } = use('Test/Suite')('Post');

// const { ioc } = use('@adonisjs/fold');

const Post = use('App/Models/Post');

const Permission = use('Adonis/Acl/Permission');

// const PostHook = use('App/Models/Hooks/PostHook');
// const Job = use('App/Jobs/PostMail');

// const Mail = use('Mail');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('It should be able to show a single post', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const post = await Factory.model('App/Models/Post').create({
    author_id: user.id,
  });

  const response = await client
    .get(`posts/${post.slug}`)
    .loginVia(user)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, post.title);
  assert.equal(response.body.author_id, user.id);
  assert.equal(response.body.body, post.body);
});

test('It should be able to create a post and return the informations', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const createPost = await Permission.create({
    slug: 'create-post',
    name: 'Criação de post',
  });

  await user.permissions().attach(createPost.id);

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

test('It should be able to update a post', async ({ client, assert }) => {
  const postPayload = {
    title: 'Título atualizado',
    body: 'Corpo atualizadoo',
  };

  const user = await Factory.model('App/Models/User').create();

  const createPost = await Permission.create({
    slug: 'create-post',
    name: 'Criação de post',
  });

  await user.permissions().attach(createPost.id);

  const post = await Factory.model('App/Models/Post').create({
    author_id: user.id,
  });

  const response = await client
    .put(`posts/${post.slug}`)
    .loginVia(user)
    .send(postPayload)
    .end();

  response.assertStatus(200);
  assert.equal(response.body.title, postPayload.title);
  assert.equal(response.body.body, postPayload.body);
});

test('It should be able to delete a post', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const createPost = await Permission.create({
    slug: 'create-post',
    name: 'Criação de post',
  });

  await user.permissions().attach(createPost.id);

  const post = await Factory.model('App/Models/Post').create({
    author_id: user.id,
  });

  await client
    .delete(`posts/${post.slug}`)
    .loginVia(user)
    .end();

  const checkUser = await Post.find(user.id);

  assert.isNull(checkUser);
});

// test('It should be able to send email to followers after create post', async ({
//   client,
//   assert,
// }) => {
//   ioc.fake('App/Models/Hooks/PostHook', () => {
//     return {
//       sendNewPostMail: async () => {
//         ioc.fake('App/Jobs/PostMail', () => {
//           return {};
//         });
//         Mail.fake();
//         await PostHook.sendNewPostMail(post);
//         await new Job().handle({ user, author, post });

//         const recentEmail = Mail.pullRecent();

//         assert.equal(recentEmail.message.to[0].address, user.email);
//         Mail.restore();
//         ioc.restore('App/Jobs/PostMail');
//       },
//     };
//   });
//   const author = await Factory.model('App/Models/User').create();
//   const user = await Factory.model('App/Models/User').create();

//   await user.following().attach(author.id);

//   const post = await Factory.model('App/Models/Post').create({
//     author_id: author.id,
//   });
//   ioc.restore('App/Models/Hooks/PostHook');
// });
