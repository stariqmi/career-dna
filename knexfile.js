module.exports = {
	development: {
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
	    migrations: {
	    	tableName: 'knex_migrations',
	    },
  	},

  	production: {
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
    	migrations: {
      		tableName: 'knex_migrations',
    	},
  	},
};