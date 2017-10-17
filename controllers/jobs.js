const R = require('ramda')
const Job = require('../models').Job
const Role = require('../models').Role
const Applicant = require('../models').Applicant

module.exports.renderEmployerJobs = (req, res) => {
  const employerId = req.user.id
 
  Job.forge({ created_by: employerId })
    .fetchAll({ withRelated: ['applicants'] })
    .then((jobs) => {
      if (jobs.length === 0) res.render('jobs', { published: [], unpublished: [] })
      else {
        const published = R.filter(j => j.published, jobs.toJSON())
        const unpublished = R.filter(j => !j.published, jobs.toJSON())
        res.render('jobs', { published, unpublished })
      }
    })
}

module.exports.renderAllPublishedJobs = (req, res) => {
  Job.forge({ published: true })
    .fetchAll({ withRelated: ['applicants', 'role', 'createdBy'] })
    .then((jobs) => {
      if (jobs.length === 0) return res.render('all_jobs', { jobs: [] })
      else return res.render('all_jobs', { jobs: jobs.toJSON() })
    })
}

module.exports.renderAppliedToJobs = (req, res) => {
  Applicant.forge({ user_id: req.user.id })
    .fetchAll({ withRelated: ['job'] })
    .then((applications) => {
      if (applications.length === 0) return res.render('my_jobs', { jobs: [] })
      else return res.render('my_jobs', { jobs: applications.toJSON().map(a => a.job) })
    })
}

module.exports.applyToJob = (req, res) => {
  const job_id = req.params.id
  const user_id = req.user.id

  Applicant.forge({ job_id, user_id })
    .fetch()
    .then((applicant) => {
      if (applicant) return false
      else return Applicant.forge({ job_id, user_id }).save()
    })
    .then((applicant) => {
      if (applicant) res.render('application_success')
      else res.render('application_duplicate')
    })
    .catch((error) => {
      res.render('application_error')
    })
}

module.exports.renderPostJob = (req, res) => {
  Role.fetchAll()
    .then((roles) => {
      res.render('post_job', { roles: roles.toJSON() })
    })
}

module.exports.renderDraft = (req, res) => {
  Job.forge({ id: req.params.id })
    .fetch()
    .then((job) => {
      Role.fetchAll()
        .then((roles) => {
          res.render('draft', { job: job.toJSON(), roles: roles.toJSON() })
        })
    })
}

module.exports.createJob = (req, res) => {
  const created_by = req.user.id
  const job = req.body

  Job.forge(Object.assign({}, job, { created_by }))
    .save()
    .then((savedJob) => {
      res.send({ status: 'ok' })
    })
    .catch((error) => {
      res.send({ status: 'failed', error })
    })
}

module.exports.updateJob = (req, res) => {
  const job = req.body
  
  Job.forge({ id: req.params.id })
    .save(job, { patch: true })
    .then((savedJob) => {
      res.send({ status: 'ok' })
    })
    .catch((error) => {
      console.log(error)
      res.send({ status: 'failed', error })
    })
}

module.exports.renderJob = (req, res) => {
  const id = parseInt(req.params.id)
  const isEmployer = req.user.type === 'employer'
  const query = isEmployer ? { id, created_by: req.user.id } : { id }

  Job.forge(query)
    .fetch({ withRelated: ['applicants', 'role' ]})
    .then((job) => {
      if (job) res.render('job', { job: job.toJSON() })
      else res.send({ message: '404 Not Found' })
    })
    .catch((error) => {
      console.log(error)
      res.send({ status: 'failed', error })
    })
}