exports.seed = function(knex) {
  return knex('jobs').insert([
    {id: 1, title: 'Software Developer', description: 'Software Developer for a startup', position_type: 'Junior', role_id: 1, created_by: 1 },
    {id: 2, title: 'Software Tester', description: 'Software Tester for a startup', position_type: 'Intermediate', role_id: 2, created_by: 1 },
    {id: 3, title: 'Product Manager', description: 'Product Manager for a startup', position_type: 'Senior', role_id: 3, created_by: 1 },
  ])
}
