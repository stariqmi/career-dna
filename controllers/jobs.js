const Job = require('../models').Job

module.exports.renderEmployerJobs = (req, res) => {
  const employerId = req.user.id
  console.log(employerId)
  
  Job.forge({ created_by: employerId })
    .fetchAll()
    .then((jobs) => {
      console.log(jobs.toJSON())
      if (jobs.length === 0) res.render('jobs', { jobs: [] })
      else res.render('jobs', { jobs: jobs.toJSON() }) 
    })
}