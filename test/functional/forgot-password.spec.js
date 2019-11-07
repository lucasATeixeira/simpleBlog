'use strict';

// const Mail = use('Mail');

const Hash = use('Hash');

const { ioc } = use('@adonisjs/fold');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const Mail = use('Mail');

const ForgotMail = use('App/Jobs/ForgotMail');

const { test, trait } = use('Test/Suite')('Forgot Password');

trait('Test/ApiClient');
trait('DatabaseTransactions');

async function generateForgotPasswordTokenOnUser(client, assert) {
  Mail.fake();
  ioc.fake('App/Jobs/ForgotMail', () => {
    return {};
  });

  const forgotPayload = {
    email: 'lucas.at.negocios@gmail.com',
  };

  const user = await Factory.model('App/Models/User').create(forgotPayload);

  await client
    .post('/forgot')
    .send({ email: user.email })
    .end();

  await new ForgotMail().handle({ user });

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, user.email);

  const userWithToken = await User.findByOrFail('email', user.email);

  ioc.restore('App/Jobs/ForgotMail');

  Mail.restore();

  return userWithToken;
}

test('it should send an email reset password and insert token informations at User model', async ({
  client,
  assert,
}) => {
  const user = await generateForgotPasswordTokenOnUser(client, assert);

  assert.exists(user.token);
  assert.exists(user.token_created_at);
});

test('it should be able to reset password', async ({ client, assert }) => {
  const userWithToken = await generateForgotPasswordTokenOnUser(client, assert);

  await client
    .put('/forgot')
    .send({
      token: userWithToken.token,
      password: 'nova-senha',
      password_confirmation: 'nova-senha',
    })
    .end();

  const user = await User.findByOrFail('email', userWithToken.email);

  const checkPassword = await Hash.verify('nova-senha', user.password);

  assert.isTrue(checkPassword);
});
