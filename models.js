const knex = require('knex');
const bookshelf = require('bookshelf');

const knexConn = knex({
  client: 'postgresql',
  connection: {
    database: 'dna',
    user: 'diligen',
    password: 'diligen#123',
  },
  pool: {
    min: 2,
    max: 10,
  },
});

const DB = bookshelf(knexConn);


const User = DB.Model.extend({
	tableName: 'users'
})

module.exports = {
	User,
}