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

// Testing Purposes - how it works
// connection.on("query", ({ sql, bindings }) => {
//   const query = connection.raw(sql, bindings).toQuery();
//   console.log(query);
//   console.log(`------`);
// });
