exports.up = (knex) => {
  return knex.schema.alterTable('jobs', (table) => {
    table.integer('role_id')
    table.foreign('role_id').references('roles.id')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('jobs', (table) => {
    table.dropColumn('role_id')
  })
}