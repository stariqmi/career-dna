const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bcrypt = require('bcrypt');

const models = require('./models')

const compileChartData = require('./chartData')
const radarChartData = require('./radar_chart_data')

const User = models.User

const port = process.env.PORT || 3030;

const mongoUri = 'mongodb://zipjobsadmin:Zip10065@zipjobs-shard-00-00-j5kbg.mongodb.net:27017,zipjobs-shard-00-01-j5kbg.mongodb.net:27017,zipjobs-shard-00-02-j5kbg.mongodb.net:27017/test?ssl=true&replicaSet=ZipJobs-shard-0&authSource=admin'

const saltRounds = 10;

const app = express()
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))


MongoClient.connect(mongoUri, function(err, db) {
    assert.equal(null, err)
    console.log("Connected successfully to mongo dbserver")
  
  app.get('/', (req, res) => res.render('landing'))

  app.get('/signup', (req, res) => res.render('signup'))

  app.get('/discover', (req, res) => res.render('main'))

  app.get('/ingredients', (req, res) =>   res.render('ingredients'))

  app.get('/data', (req, res) => {
    const collection = db.collection('ingredientSubmission')
    collection.find().toArray((error, docs) => {
      assert.equal(null, error)
      res.json(compileChartData(docs))
    })
  })

  app.get('/results', (req, res) => res.render('results'))
  app.get('/results_2', (req, res) => res.render('results_2'))

  app.get('/radar_chart_data', (req, res) => {
    const collection = db.collection('ingredientSubmission')
    collection.find().toArray((error, docs) => {
      assert.equal(null, error)
      res.json(radarChartData(docs))
    })
  })

  app.post('/submit', (req, res) => {
    const data = req.body

    const collection = db.collection('ingredientSubmission')
      collection.insertOne(req.body, (err, r) => {
        if (err || r.insertedCount !== 1) res.send({ status: 'failed' })
        else res.send({ status: 'ok' })
      })
  })

  app.post('/user', (req, res) => {
    const user = req.body

    User.forge({ email: user.email })
      .fetch()
      .then((existing) => {
        if (existing) res.send({ status: 'failed', error: { message: 'User with email already exists' } })
        else  {
          bcrypt.hash(user.password, saltRounds)
            .then(function(hash) {
                user.password = hash
              User.forge(user)
                .save()
                .then((newUser) => {
                  res.send({ status: 'ok'})
                })
                .catch((err) => {
                  res.send({ status: 'failed', error: { message: 'Unable to create user, please try again' } })
              })
            })
        }
      })
  })
  app.listen(port, () => console.log(`Server running on port ${port}`))
})
