const User = require('../models').User

module.exports.renderProfile = (req, res) => {
  const id = req.user.id

  User.forge({ id })
    .fetch()
    .then((user) => {
      res.render('profile', { user: user.toJSON() })
    })
}