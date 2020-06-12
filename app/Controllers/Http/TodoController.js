"use strict";
const Todo = use("App/Models/Todo");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
  /**
   * Show a list of all todos.
   * GET todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth, response, view }) {
    try {
      let todos = await Todo.query()
        .where("user_id", auth.user.id)
        .orderBy("created_at", "desc")
        .fetch();
      return response.status(200).json({
        message: "Request completed successfully.",
        todos: todos.toJSON(),
      });
    } catch (e) {
      console.log(e);
      return response.status(e.status || 500).json({
        message: "Something went wrong.",
        error: e || "We're working on fixing what went wrong.",
      });
    }
  }

  /**
   * Create/save a new todo.
   * POST todos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    try {
      const { todo, categories } = request.all();
      const newTodo = await Todo.create({
        todo,
        user_id: auth.user.id,
      });
      if (categories && categories.length > 0) {
        await newTodo.category().attach(categories);
        newTodo.tags = await newTodo.category().fetch();
      }

      return response.status(201).json({
        message: "Successfully added item.",
        data: newTodo,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status || 500).json({
        message: "Something went wrong.",
        error: err || "We're working on fixing what went wrong.",
      });
    }
  }

  /**
   * Display a single todo.
   * GET todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update todo details.
   * PUT or PATCH todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    try {
      const { todo, completed, categories } = request.all();
      const updateTodo = await Todo.findOrFail(params.id);

      if (auth.user.id !== updateTodo.user_id) {
        throw {
          status: 401,
          message: "You don't have persmission to edit this post.",
        };
      }

      updateTodo.todo = todo || updateTodo.todo;
      updateTodo.completed = completed || updateTodo.completed;
      await updateTodo.save();

      if (categories && categories.length > 0) {
        await updateTodo.category().detach();
        await updateTodo.category().attach(categories);
        updateTodo.categories = await updateTodo.category().fetch();
      }

      return response.status(200).json({
        message: "Successfully updated item.",
        data: updateTodo,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status || 500).json({
        message: "Something went wrong.",
        error: err.message || "We're working on fixing what went wrong.",
      });
    }
  }

  /**
   * Delete a todo with id.
   * DELETE todos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, session, request, response }) {
    try {
      const todo = await Todo.findOrFail(params.id);

      if (auth.user.id !== todo.user_id) {
        throw {
          status: 401,
          message: "You don't have persmission to delete this post.",
        };
      }

      await todo.delete();
      response.status(200).json({
        message: "Item successfully deleted.",
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status).json({
        message: "Something went wrong.",
        error: err,
      });
    }
  }
}

module.exports = TodoController;
