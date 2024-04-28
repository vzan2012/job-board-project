import knex from "knex";

/**
 * Knex Query Builder Configuration
 *
 * @type {*}
 */
export const connection = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
});
