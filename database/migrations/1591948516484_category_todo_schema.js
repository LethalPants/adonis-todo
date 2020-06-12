"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategoryTodoSchema extends Schema {
  up() {
    this.create("category_todo", (table) => {
      table.integer("todo_id").unsigned();

      table
        .foreign("todo_id")
        .references("id")
        .inTable("todos")
        .onDelete("cascade");

      table.integer("category_id").unsigned();

      table
        .foreign("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("cascade");
    });
  }

  down() {
    this.drop("category_todo");
  }
}

module.exports = CategoryTodoSchema;
