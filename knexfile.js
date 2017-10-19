module.exports = {
	development: {
	    client: 'postgresql',
	    connection: {
	    	database: 'dna',
	    	user: 'postgres',
	    	password: 'diligen#123',
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
      		database: 'dna',
      		user: 'postgres',
      		password: 'diligen#123',
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