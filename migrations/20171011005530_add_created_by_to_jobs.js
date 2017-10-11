exports.up = (knex) => {
  return knex.schema.alterTable('jobs', (table) => {
    table.integer('created_by')
    table.foreign('created_by').references('users.id')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('jobs', (table) => {
    table.dropColumn('created_by')
  })
}