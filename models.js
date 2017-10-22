const knex = require('knex');
const bookshelf = require('bookshelf');

const knexConn = knex({
  client: 'postgresql',
  connection: {
    host: 'elmer.db.elephantsql.com',
    database: 'nyagrpvw',
    user: 'nyagrpvw',
    password: '1rveJl-e2DqEKdmu1ynKxmPCGOGeswWa'
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
  user() {
    return this.belongsTo('User')
  },
  job() {
    return this.belongsTo('Job')
  }
})

const Job = DB.model('Job', {
  tableName: 'jobs',
  applicants() {
    return this.belongsToMany('User').through('Applicant')
  },
  role() {
    return this.belongsTo('Role')
  },
  createdBy() {
    return this.belongsTo('User', 'created_by')
  }
})

module.exports = {
	User,
  Role,
  Applicant,
  Job,
}