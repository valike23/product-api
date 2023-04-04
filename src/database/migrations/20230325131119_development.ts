


exports.up = function(Knex) {
    return Knex.schema.createTable('users', function(table) {
      table.bigIncrements('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function(Knex) {
    return Knex.schema.dropTable('users');
  };
  

