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

Route.post('forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.put('forgot', 'ForgotPasswordController.update').validator('Reset');

Route.get('users', 'UserController.index');
Route.get('users/:id', 'UserController.show');
Route.post('users', 'UserController.store').validator('User');

Route.get('files/:id', 'FileController.show');

Route.group(() => {
  Route.put('users/:id', 'UserController.update').validator('UserUpdate');
  Route.delete('users/:id', 'UserController.destroy');

  Route.get('followers', 'FollowerController.index');

  Route.get('following', 'FollowingController.index');
  Route.post('users/:author_id/following', 'FollowingController.store');
  Route.delete('users/:author_id/following', 'FollowingController.destroy');

  Route.post('files', 'FileController.store').validator('File');

  Route.resource('posts', 'PostController').validator(
    new Map([[['posts.store'], ['Post']], [['posts.update'], ['Post']]])
  );
}).middleware(['auth']);
