
try {
    
  exports.up = function (knex: any) {
      return knex.schema
      .createTableIfNotExists('users', function(table: any) {
        table.bigIncrements('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
      })
        .createTableIfNotExists('products', function (table: any) {
          table.increments('id');
          table.string('name');
          table.string('slug');
          table.string('short_desc');
          table.float('price');
          table.float('sale_price');
          table.integer('review');
          table.float('ratings');
          table.string('until');
          table.integer('stock');
          table.boolean('top');
          table.boolean('featured');
          table.boolean('new');
          table.string('author');
          table.integer('sold');
        })
        .createTableIfNotExists('categories', function (table: any) {
          table.string('name');
          table.string('slug');
          table.integer('product_id').unsigned();
          table.foreign('product_id').references('id').inTable('products');
        })
        .createTableIfNotExists('brands', function (table: any) {
          table.string('name');
          table.string('slug');
          table.integer('product_id').unsigned();
          table.foreign('product_id').references('id').inTable('products');
        })
        .createTableIfNotExists('media', function (table: any) {
          table.integer('width');
          table.integer('height');
          table.string('url');
          table.integer('product_id').unsigned();
          table.foreign('product_id').references('id').inTable('products');
        })
        .createTableIfNotExists('variants', function (table: any) {
          table.string('color');
          table.string('color_name');
          table.float('price');
          table.integer('product_id').unsigned();
          table.foreign('product_id').references('id').inTable('products');
        })
        .createTableIfNotExists('sizes', function (table: any) {
          table.string('name');
          table.integer('variant_id').unsigned();
          table.foreign('variant_id').references('id').inTable('variants');
        })
        .createTableIfNotExists('admins', function (table: any) {
          table.increments('id');
          table.string('email').unique();
          table.string('password');
          table.string('name');
          table.timestamps(false, true);
        });
    };
    
    exports.down = function (knex: any) {
      return knex.schema.dropTable('users')
        .dropTableIfExists('sizes')
        .dropTableIfExists('variants')
        .dropTableIfExists('media')
        .dropTableIfExists('brands')
        .dropTableIfExists('categories')
        .dropTableIfExists('products')
        .dropTableIfExists('admins');
    };
    
  } catch (error) {
      console.log(error);
      console.log('something went wrong')
  }