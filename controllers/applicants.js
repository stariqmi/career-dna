const Job = require('../models').Job
const Applicant = require('../models').Applicant

const scoreCriteria = {
  WORK_ROLE: {
    each: 3,
    multiply_by: 10,
    elements: [
      'Work',
      'Internship',
      'Job Search',
      'More than 1 job', 
      'Work more hours',
    ]
  },
  INSTITUTIONAL: {
    each: 1,
    multiply_by: 5,
    elements: [
      'Specific Program',
      'Pell Grant',
      'NO RECRUTUING / CAREER SVCS HELP',
    ],
  },
  SOCIAL: {
    each: 1,
    multiply_by: 5,
    elements: [
      'Family', 
      'Rank / Reputation',
      'Fraternities',
      'Varsity',
    ],
  },
  PROACTIVE: {
    each: 2,
    multiply_by: 10,
    elements: [
      'LACK OF CONNECTIONS',
      'Remdial', 
      'Certification',
      'First to go to college',
    ],
  },
}

function calculateScore(dna, matchBy) {
  const ingredients = dna.ingredients
  const criteria = scoreCriteria[matchBy]

  let score = 0
  for (let ingredientKey in ingredients) {
    const ingredient = ingredients[ingredientKey]
    const lowerCaseIngredient = ingredient.toLowerCase()
    criteria.elements.forEach((element) => {
      const lowerCaseElement = element.toLowerCase()
      if (lowerCaseIngredient.includes(lowerCaseElement)) score += criteria.each
    })
  }

  return score * criteria.multiply_by
}

module.exports.renderAll = (req, res) => {
  Job.where({ created_by: req.user.id })
    .fetchAll({ withRelated: ['applicants'] })
    .then((jobs) => {
      res.render('applicants', { jobs: jobs.toJSON() })
    })
}

module.exports.renderJobApplicants = (req, res) => {
  const minScore = parseInt(req.query.min_score)

  Applicant.where({ job_id: req.query.job_id })
    .fetchAll({ withRelated: ['user', 'job'] })
    .then((applicants) => {
      const applicantsJSON = applicants.toJSON()
      const applicantIDs = applicantsJSON.map(applicant => applicant.user.id)
      const collection = req.mongoDb.collection('ingredientSubmission')
      collection.find( { user_id: { $in: applicantIDs } } )
        .toArray()
        .then((DNAs) => {
          const applicantScores = {}
          DNAs.forEach((dna) => {
            applicantScores[dna.user_id] = calculateScore(dna, req.query.match_by)
          })

          const haveMinScore = []
          for (let userId in applicantScores) {
            if (applicantScores[userId] >=  minScore) haveMinScore.push(userId)
          }
          res.render('job_applicants', { title: applicantsJSON[0].job.title, matches: haveMinScore })
        })
    })
}