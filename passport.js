const bcrypt = require('bcrypt')
const LocalStrategy   = require('passport-local').Strategy
const User = require('./models').User

const saltRounds = 10

function login() {
  return new LocalStrategy(
  {
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    User.forge({ email :  username })
      .fetch()
      .then((user) => {
        if (!user) return done(null, false)
        else {
          bcrypt.compare(password, user.get('password')).then(function(res) {
            if (res) return done(null, user.toJSON())
            else return done(null, false)
          })
        }
      })
      .catch((err) => {
        return done(err, false)
      })
  })
}

function signup() {
  return new LocalStrategy(
    {
      passReqToCallback : true
    },
    function(req, username, password, done) {
      findOrCreateUser = function() {
        const user = {}
        User.forge({ email: username })
          .fetch()
          .then((existing) => {
            if (existing) {
              return done(null, false)
            }
            else  {
              bcrypt.hash(password, saltRounds)
                .then(function(hash) {
                  user.email = username
                  user.password = hash
                  User.forge(user)
                    .save()
                    .then((newUser) => {
                      return done(null, newUser.toJSON())
                    })
                    .catch((err) => {
                      return done(null, false)
                    })
                })
            }
          })
      }
       
      // Delay the execution of findOrCreateUser and execute 
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }
  )
}

module.exports = {
  login,
  signup
}
