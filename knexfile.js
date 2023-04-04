

let {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD}  = process.env;
module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD || '',
        database: 'demosysdb',
        port: 3306,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${__dirname}/source/src/database/migrations`,
      },
    },
  };