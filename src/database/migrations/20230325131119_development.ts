


exports.up = function(Knex: any) {
    return Knex.schema.createTable('users', function(table: any) {
      table.bigIncrements('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
    });
  };
  
  exports.down = function(Knex: any) {
    return Knex.schema.dropTable('users');
  };
  

