exports.up = (knex) => {
  return knex.schema.createTable('jobs', (table) => {
  	table.increments('id')
  	table.string('title')
  	table.text('description')
  	table.string('position_type')
  	table.boolean('published')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('jobs')
}
