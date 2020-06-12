"use strict";

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
const Route = use("Route");

Route.get("/api/v1", ({ response }) => {
  return response.json({ message: "Hello" });
});

/* Todo Routes */
Route.group(() => {
  Route.get("/", "TodoController.index").as("todos.index");

  Route.post("/new", "TodoController.store").as("todos.store");

  Route.patch("/:id/", "TodoController.update").as("todos.update");

  Route.delete("/:id/", "TodoController.destroy").as("todos.delete");
})
  .middleware(["auth"])
  .prefix("api/v1/todos");

/* User route */
Route.group(() => {
  Route.post("/register", "RegisterController.store")
    .as("register.store")
    .validator("Register");

  Route.post("/login", "LoginController.store").as("login.store");
  Route.post("/logout", "LogoutController.store").as("logout.store");
})
  .middleware(["guest"])
  .prefix("api/v1/users");

Route.group(() => {
  Route.get("/", "CategoryController.index");
  Route.get("/:id", "CategoryController.show");
  Route.post("/", "CategoryController.store");
  Route.patch("/:id", "CategoryController.update");
  Route.delete("/:id", "CategoryController.delete");
})
  .middleware(["auth"])
  .prefix("api/v1/todos/categories");
