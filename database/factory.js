'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, id, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.password(),
    bio: faker.paragraph(),
    ...data,
  };
});

Factory.blueprint('App/Models/Post', (faker, id, data = {}) => {
  return {
    title: faker.sentence({ words: 7 }),
    body: faker.paragraph(),
    ...data,
  };
});
