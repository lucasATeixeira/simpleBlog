'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('sessions', 'SessionController.store').validator('Session');

Route.post('users', 'UserController.store').validator('User');

Route.post('forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.put('forgot', 'ForgotPasswordController.update').validator('Reset');

Route.get('files/:id', 'FileController.show');

Route.group(() => {
  Route.get('users', 'UserController.index');

  Route.post('files', 'FileController.store');

  Route.resource('posts', 'PostController').validator(
    new Map([[['posts.store'], ['Post']], [['posts.update'], ['Post']]])
  );
}).middleware(['auth']);
