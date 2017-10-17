exports.up = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.boolean('dna_added').defaultTo(false)
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('users', (table) => {
    table.dropColumn('dna_added').defaultTo(false)
  }) 
}
