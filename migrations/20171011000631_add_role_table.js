exports.up = (knex) => {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id')
    table.string('type')
    table.text('description')
    table.string('label')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('roles')
}
