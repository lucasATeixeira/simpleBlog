"use strict";

const Mail = use("Mail");

const Hash = use("Hash");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const { test, trait } = use("Test/Suite")("Forgot Password");

trait("Test/ApiClient");
trait("DatabaseTransactions");

async function generateForgotPasswordTokenOnUser(client, payload) {
  await Factory.model("App/Models/User").create(payload);

  await client
    .post("/forgot")
    .send(payload)
    .end();

  const user = await User.findByOrFail("email", payload.email);

  return user;
}

test("it should send an email reset password and insert token informations at User model", async ({
  client,
  assert
}) => {
  Mail.fake();

  const forgotPayload = {
    email: "lucas.at.negocios@gmail.com"
  };

  const user = await generateForgotPasswordTokenOnUser(client, forgotPayload);

  const recentEmail = Mail.pullRecent();

  assert.exists(user.token);
  assert.exists(user.token_created_at);
  assert.equal(recentEmail.message.to[0].address, forgotPayload.email);

  Mail.restore();
});

test("it should be able to reset password", async ({ client, assert }) => {
  const forgotPayload = {
    email: "lucas.at.negocios@gmail.com"
  };

  const userWithToken = await generateForgotPasswordTokenOnUser(
    client,
    forgotPayload
  );

  await client
    .put("/forgot")
    .send({
      token: userWithToken.token,
      password: "nova-senha",
      password_confirmation: "nova-senha"
    })
    .end();

  const user = await User.findByOrFail("email", forgotPayload.email);

  const checkPassword = await Hash.verify("nova-senha", user.password);

  assert.isTrue(checkPassword);
});
