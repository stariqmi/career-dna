exports.seed = function(knex) {
  return knex('roles').insert([
    {id: 1, type: 'software-dev', description: 'Software Developer', label: 'Software Developer' },
    {id: 2, type: 'software-test', description: 'Software Tester', label: 'Software Tester' },
    {id: 3, type: 'software-architect', description: 'Software Architect', label: 'Software Architect' },
  ])
}
