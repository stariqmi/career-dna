const User = require('../models').User

module.exports.addDNAForUser = (req, res) => {
  const data = req.body

  const collection = req.mongoDb.collection('ingredientSubmission')
    collection.insertOne(req.body, (err, r) => {
      if (err || r.insertedCount !== 1) res.send({ status: 'failed' })
      else {
        User.forge({ id: req.user.id })
          .save({ dna_added: true }, { method: 'update' })
          .then((user) => {
            res.send({ status: 'ok' })
          })
          .catch((error) => {
            console.log(error)
            res.send({ status: 'failed', error })
          })
      }
  })
}