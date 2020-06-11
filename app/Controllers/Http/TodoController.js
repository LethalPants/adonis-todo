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
      const todos = await Todo.query().where("user_id", auth.user.id).fetch();
      return response.status(200).json({
        todos: todos.toJSON(),
      });
    } catch (e) {
      console.log(e);
      return response.status(e.status).json({
        message: "Something went wrong.",
        error: e,
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
      const reqItem = request.only(["todo"]).todo;
      const todo = await Todo.create({
        todo: reqItem,
        user_id: auth.user.id,
      });

      return response.status(201).json({
        message: "Successfully added item.",
        item: todo,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status).json({
        message: "Something went wrong.",
        error: err,
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
      const reqItem = request.only(["todo", "completed"]);
      const todo = await Todo.findOrFail(params.id);

      if (auth.user.id !== todo.user_id) {
        throw {
          status: 401,
          message: "You don't have persmission to edit this post.",
        };
      }

      todo.todo = reqItem.todo;
      reqItem.todo ? (todo.todo = reqItem.todo) : null;
      reqItem.completed ? (todo.completed = reqItem.completed) : null;
      await todo.save();
      return response.status(200).json({
        message: "Successfully updated item.",
        item: todo,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status).json({
        message: "Something went wrong.",
        error: err.message,
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
          message: "You don't have persmission to edit this post.",
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
