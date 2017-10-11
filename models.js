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
DB.plugin('registry')


const User = DB.Model.extend({
	tableName: 'users'
})

const Role = DB.Model.extend({
  tableName: 'roles',
  jobs() {
    return this.hasMany('Job')
  },
})

const Applicant = DB.Model.extend({
  tableName: 'applicants',
  applicant() {
    return this.hasOne('User')
  },
  job() {
    return this.belongsTo('Job')
  }
})

const Job = DB.Model.extend({
  tableName: 'jobs',
  applicants() {
    return this.hasMany('Applicant')
  },
  role() {
    return this.hasOne('Role')
  }
})

module.exports = {
	User,
  Role,
  Applicant,
  Job,
}