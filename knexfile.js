// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "xdoc-test",
      user: "xdoc-db",
      password: "xdoc69"
    },
    migrations: {
      directory: "./src/infrastructure/db/postgres/knex/migrations"
    },
    seeds: {
      directory: "./src/infrastructure/db/postgres/knex/seeds/dev"
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
