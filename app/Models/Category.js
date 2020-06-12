"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Category extends Model {
  todo() {
    return this.belongsToMany("App/Models/Todo");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Category;
