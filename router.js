const assert = require('assert')
const router = require('express').Router()

const radarChartData = require('./render_chart_data')
const jobsController = require('./controllers/jobs')
const dnaController = require('./controllers/dna')

const isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

function routerWrapper(passport, mongoDb) {

  function setMongoDB(req, res, next) {
    req.mongoDb = mongoDb
    next()
  }

  router.get('/', isAuthenticated, (req, res) => {
    if (req.user.type === 'employer') return res.redirect('/jobs')
    else if (req.user.dna_added) return res.redirect('/all_jobs')
    return res.render('main')
  })

  router.get('/jobs', isAuthenticated, jobsController.renderEmployerJobs)
  router.get('/all_jobs', isAuthenticated, jobsController.renderAllPublishedJobs)
  router.get('/my_jobs', isAuthenticated, jobsController.renderAppliedToJobs)
  router.get('/post_job', isAuthenticated, jobsController.renderPostJob)
  router.get('/drafts/:id', isAuthenticated, jobsController.renderDraft)

  router.get('/jobs/:id', isAuthenticated, jobsController.renderJob)
  router.post('/job', isAuthenticated, jobsController.createJob)
  router.put('/jobs/:id', isAuthenticated, jobsController.updateJob)
  router.get('/apply/:id', isAuthenticated, jobsController.applyToJob)

  router.get('/applicants', (req, res) => res.render('applicants'))

  router.get('/signup', (req, res) => res.render('signup'))
  router.get('/login', (req, res) => res.render('login'))

  router.get('/discover', isAuthenticated, (req, res) => res.render('main'))

  router.get('/ingredients', isAuthenticated, (req, res) =>   res.render('ingredients'))

  router.get('/data', isAuthenticated, (req, res) => {
    const collection = mongoDb.collection('ingredientSubmission')
    collection.find().toArray((error, docs) => {
      assert.equal(null, error)
      res.json(compileChartData(docs))
    })
  })

  router.get('/results', isAuthenticated, (req, res) => res.render('results'))
  router.get('/results_2', isAuthenticated, (req, res) => res.render('results_2'))

  router.get('/radar_chart_data', isAuthenticated, (req, res) => {
    const collection = mongoDb.collection('ingredientSubmission')
    collection.find().toArray((error, docs) => {
      assert.equal(null, error)
      res.json(radarChartData(docs))
    })
  })

  router.post('/submit', isAuthenticated, setMongoDB, dnaController.addDNAForUser)

  router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (error, user) => {
      if (error) { return res.send({ status: 'failed', error }) }
        if (!user) { return res.send({ status: 'failed', error }) }
        
        req.login(user, function(err) {
          if (err) { return res.send({ status: 'failed', error: err }) }
          return res.send({ status: 'ok' });
        });
    })(req, res, next)
  })

  router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user) => {
      if (error) { return res.send({ status: 'failed', error }) }
        if (!user) { return res.send({ status: 'failed', error }) }
        req.login(user, function(err) {
          if (err) { return res.send({ status: 'failed', error: err }) }
          return res.send({ status: 'ok' });
        });
    })(req, res, next)
  })

  router.get('/logout', function(req, res) {
      req.logout()
      res.redirect('/')
  })

  return router
}

module.exports = routerWrapper