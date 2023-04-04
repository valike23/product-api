const knex = require('knex');
try {
    
exports.up = function (knex) {
    return knex.schema
      .createTable('products', function (table) {
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
      .createTable('categories', function (table) {
        table.string('name');
        table.string('slug');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('id').inTable('products');
      })
      .createTable('brands', function (table) {
        table.string('name');
        table.string('slug');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('id').inTable('products');
      })
      .createTable('media', function (table) {
        table.integer('width');
        table.integer('height');
        table.string('url');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('id').inTable('products');
      })
      .createTable('variants', function (table) {
        table.string('color');
        table.string('color_name');
        table.float('price');
        table.integer('product_id').unsigned();
        table.foreign('product_id').references('id').inTable('products');
      })
      .createTable('sizes', function (table) {
        table.string('name');
        table.integer('variant_id').unsigned();
        table.foreign('variant_id').references('id').inTable('variants');
      })
      .createTable('admins', function (table) {
        table.increments('id');
        table.string('email').unique();
        table.string('password');
        table.string('name');
        table.timestamps(false, true);
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
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