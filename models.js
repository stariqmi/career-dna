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


const User = DB.model('User', {
	tableName: 'users'
})

const Role = DB.model('Role', {
  tableName: 'roles',
  jobs() {
    return this.hasMany('Job')
  },
})

const Applicant = DB.model('Applicant', {
  tableName: 'applicants',
  applicant() {
    return this.hasOne('User')
  },
  job() {
    return this.belongsTo('Job')
  }
})

const Job = DB.model('Job', {
  tableName: 'jobs',
  applicants() {
    return this.hasMany('Applicant', 'applicant_id')
  },
  role() {
    return this.hasOne('Role')
  },
  createdBy() {
    return this.hasOne('User', 'created_by')
  }
})

module.exports = {
	User,
  Role,
  Applicant,
  Job,
}