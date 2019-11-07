'use strict';

const Mail = use('Mail');

class ForgotMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'ForgotMail-job';
  }

  async handle({ user, resetPasswordUrl = '' }) {
    await Mail.send(
      ['emails.forgotpassword'],
      { name: user.name, resetPasswordUrl },
      message => {
        message
          .to(user.email)
          .from('lucas.at.negocios@gmail.com | Lucas Teixeira')
          .subject('Blog REAL - Recuperação de senha');
      }
    );
  }
}

module.exports = ForgotMail;
