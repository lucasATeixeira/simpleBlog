'use strict';
const Antl = use('Antl');
class UserUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'string',
      email: 'email|unique:users',
      password: 'confirmed',
      bio: 'string',
      avatar_id: 'string',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UserUpdate;
