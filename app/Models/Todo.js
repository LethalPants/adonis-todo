"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Todo extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  category() {
    return this.belongsToMany("App/Models/Category");
  }
}

module.exports = Todo;
