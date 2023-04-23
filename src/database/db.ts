import knex from "knex";

let {MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD}  = process.env;
console.log(MYSQL_HOST, MYSQL_USER);

export const  Knex = knex({
    client: 'mysql2',
    connection: {
        host: MYSQL_HOST || 'localhost',
        user: MYSQL_USER || 'root' ,
        password: MYSQL_PASSWORD || '',
        database: 'demosysdb'
    }
});