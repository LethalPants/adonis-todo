"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TodoSchema extends Schema {
  up() {
    this.create("todos", (table) => {
      table.increments();
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");
      table.timestamps();
      table.string("todo").notNullable();
      table.boolean("completed").default(false);
    });
  }

  down() {
    this.drop("todos");
  }
}

module.exports = TodoSchema;
