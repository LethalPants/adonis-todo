"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategoriesSchema extends Schema {
  up() {
    this.create("categories", (table) => {
      table.increments();
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade");

      table.string("name").notNullable().default("General");
      table.timestamps();
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CategoriesSchema;
