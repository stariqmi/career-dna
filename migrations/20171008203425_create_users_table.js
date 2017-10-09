exports.up = (knex) => {
	return knex.schema.createTable('users', (table) => {
		table.increments('id')
		table.string('last_name')
		table.string('first_name')
		table.string('email').notNullable()
		table.string('password').notNullable()
	})
};

exports.down = (knex) => {
	return knex.schema.dropTable('users')
};
