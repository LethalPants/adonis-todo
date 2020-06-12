"use strict";
const Category = use("App/Models/Category");

class FindCategories {
  async handle({ request, response, params: { id } }, next) {
    // call next to advance the request
    const categories = await Category.find(id);

    if (!categories) {
      return response.status(404).json({
        message: "Category not found.",
        id,
      });
    }

    request.body.tag = categories;

    await next();
  }
}

module.exports = FindCategories;
