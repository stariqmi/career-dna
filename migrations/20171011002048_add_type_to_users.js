exports.up = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.string('type')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('type')
  })
}