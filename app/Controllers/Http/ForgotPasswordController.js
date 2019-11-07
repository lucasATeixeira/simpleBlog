'use strict';

const Kue = use('Kue');
const ForgotMailJob = use('App/Jobs/ForgotMail');

const Env = use('Env');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { addDays, isBefore } = require('date-fns');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input('email');

    const user = await User.findByOrFail('email', email);

    const random = await promisify(randomBytes)(24);

    const token = random.toString('hex');

    const resetPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

    user.token = token;
    user.token_created_at = new Date();

    await user.save();

    Kue.dispatch(ForgotMailJob.key, { user, resetPasswordUrl });
  }

  async update({ request, response }) {
    const { password, token } = request.only(['token', 'password']);

    const user = await User.findByOrFail('token', token);

    const whenTokenExpires = addDays(user.token_created_at, 2);

    const tokenExpired = isBefore(whenTokenExpires, new Date());

    if (tokenExpired) {
      return response.status(401).send({ error: { message: 'Token expired' } });
    }

    user.token = null;
    user.token_created_at = null;

    user.password = password;

    await user.save();
  }
}

module.exports = ForgotPasswordController;
