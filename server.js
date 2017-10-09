const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');

const models = require('./models')
const router = require('./router')
const passportConfig = require('./passport')

const compileChartData = require('./chartData')
const radarChartData = require('./radar_chart_data')

const User = models.User

const port = process.env.PORT || 3030;

const mongoUri = 'mongodb://zipjobsadmin:Zip10065@zipjobs-shard-00-00-j5kbg.mongodb.net:27017,zipjobs-shard-00-01-j5kbg.mongodb.net:27017,zipjobs-shard-00-02-j5kbg.mongodb.net:27017/test?ssl=true&replicaSet=ZipJobs-shard-0&authSource=admin'

const saltRounds = 10;

const app = express()

app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({ secret: 'anything', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id)
});
 
passport.deserializeUser((id, done) => {
  User.forge({ id })
    .fetch()
    .then((user) => {
      done(null, user.toJSON())
    })
    .catch((err) => {
      done(err, null)
    })
})

passport.use('login', passportConfig.login())
passport.use('signup', passportConfig.signup())

MongoClient.connect(mongoUri, function(err, db) {
  assert.equal(null, err)
  console.log("Connected successfully to mongo dbserver")
  app.use(router(passport, db))
  
  app.listen(port, () => console.log(`Server running on port ${port}`))
})
