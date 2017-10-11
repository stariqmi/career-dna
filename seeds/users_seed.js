exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 1,
      last_name: 'Tariq',
      first_name: 'Salman',
      email: 'salman_employer@gmail.com',
      password: '$2a$10$Dl8XC4o0CF1O5P0V4/VAMeWBqtMoyiz6oOcAaYORBZ1yPkuhNxpVC',
      type: 'employer'
    },
    {
      id: 2,
      last_name: 'Tariq',
      first_name: 'Salman',
      email: 'salman_employee@gmail.com',
      password: '$2a$10$Dl8XC4o0CF1O5P0V4/VAMeWBqtMoyiz6oOcAaYORBZ1yPkuhNxpVC',
      type: 'employee'
    },
  ])
};
