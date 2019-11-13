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

Route.get('roles', 'RoleController.index');
Route.get('roles/:id', 'RoleController.show');

Route.group(() => {
  Route.put('users/:id', 'UserController.update').validator('UserUpdate');
  Route.delete('users/:id', 'UserController.destroy').middleware(
    'is:administrator'
  );

  Route.get('users/:id/followers', 'FollowerController.index');

  Route.get('users/:id/following', 'FollowingController.index');
  Route.post('users/:author_id/following', 'FollowingController.store');
  Route.delete('users/:author_id/following', 'FollowingController.destroy');

  Route.post('roles', 'RoleController.store').middleware('is:administrator');
  Route.put('roles/:id', 'RoleController.update').middleware(
    'is:administrator'
  );
  Route.delete('roles/:id', 'RoleController.destroy').middleware(
    'is:administrator'
  );

  Route.resource('permissions', 'PermissionController');
  Route.get('users/:id/permissions', 'UserRolesAndPermissionController.show');

  Route.post('files', 'FileController.store').validator('File');

  Route.resource('posts', 'PostController')
    .middleware(
      new Map([
        [['posts.store'], ['can:create-post']],
        [['posts.update'], ['can:create-post']],
        [['posts.destroy'], ['can:create-post']],
      ])
    )
    .validator(
      new Map([[['posts.store'], ['Post']], [['posts.update'], ['Post']]])
    );
}).middleware(['auth']);
