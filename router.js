const assert = require('assert')
const router = require('express').Router()

const isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

function routerWrapper(passport, mongoDb) {
  router.get('/', isAuthenticated, (req, res) => res.render('landing'))

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

  router.post('/submit', isAuthenticated, (req, res) => {
    const data = req.body

    const collection = mongoDb.collection('ingredientSubmission')
      collection.insertOne(req.body, (err, r) => {
        if (err || r.insertedCount !== 1) res.send({ status: 'failed' })
        else res.send({ status: 'ok' })
    })
  })

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