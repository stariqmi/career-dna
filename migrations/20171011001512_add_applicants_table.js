exports.up = (knex) => {
  return knex.schema.createTable('applicants', (table) => {
    table.increments('id')
    table.integer('applicant_id')
    table.foreign('applicant_id').references('users.id')
    table.integer('job_id')
    table.foreign('job_id').references('jobs.id')
    table.boolean('interested')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('applicants')
}