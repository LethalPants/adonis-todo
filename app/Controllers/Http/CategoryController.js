"use strict";

const Category = use("App/Models/Category");

class CategoryController {
  async index({ response, auth }) {
    try {
      const categories = await Category.query()
        .where("user_id", auth.user.id)
        .fetch();

      return response.status(200).json({
        message: "Successfully retrieved categories.",
        data: categories,
      });
    } catch (err) {
      return response.status(err.status || 500).json({
        message: "Something went wrong.",
        err: err.message || "We're working to fix what went wrong.",
      });
    }
  }
  async store({ request, response, auth }) {
    const name = request.only(["name"]).name;
    const cat = await Category.create({ name, user_id: auth.user.id });

    return response.status(201).json({
      message: "Successfully created a new tag.",
      data: cat,
    });
  }

  async show({ request, response }) {
    const { categories } = request.post();

    return response.status(200).json({
      message: "Found your categories.",
      data: categories,
    });
  }

  async update({ request, response, auth, params }) {
    try {
      const { name } = request.all();
      const category = await Todo.findOrFail(params.id);

      if (auth.user.id !== todo.user_id) {
        throw {
          status: 401,
          message: "You don't have persmission to edit this item.",
        };
      }

      category.name = name || category.name;
      await category.save();

      return response.status(200).json({
        message: "Successfully updated item.",
        data: category,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status || 500).json({
        message: "Something went wrong.",
        error: err.message || "We're working on fixing what went wrong.",
      });
    }
  }

  async delete({ request, response, auth, params }) {
    try {
      const cat = await Category.find(params.id);
      if (auth.user.id !== cat.user_id) {
        throw {
          status: 401,
          message: "You don't have persmission to delete this item.",
        };
      }

      await cat.delete();

      response.status(200).json({
        message: "Successfully deleted this tag.",
        deleted: true,
      });
    } catch (err) {
      console.log(err);
      return response.status(err.status || 500).json({
        message: "Something went wrong.",
        error: err.message || "We're working on fixing what went wrong.",
      });
    }
  }
}

module.exports = CategoryController;
