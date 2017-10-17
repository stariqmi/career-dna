exports.up = (knex) => {
  return knex.schema.alterTable('applicants', (table) => {
    table.renameColumn('applicant_id', 'user_id')
  })
}

exports.down = (knex) => {
  return knex.schema.alterTable('applicants', (table) => {
    table.renameColumn('user_id', 'applicant_id')
  }) 
}
