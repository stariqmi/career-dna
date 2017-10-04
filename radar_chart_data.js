const R = require('ramda')

module.exports = function(submissions) {
	const categories = ['Background', 'Family', 'School Costs', 'Campus Experience', 'Academic Life', 'Life Events']
	const dataset = [0, 0, 0, 0, 0, 0]

	const mapping = {
	    'My identity': 'Background',
	    'My parents': 'Family',
	    'My gender': 'Background',
	    'My family': 'Family',
	    'How I paid for school': 'School Costs',
	    'Why I chose my school': 'Campus Experience',
	    'My life on campus': 'Campus Experience',
	    'My getting used to college': 'Campus Experience',
	    'Becoming a senior': 'Campus Experience',
	    'My major': 'Academic Life',
	    'Effects of my student loans': 'School Costs',
	    'My certifications': 'Academic Life',
	    'Barriers beyond me': 'Life Events',
	    'Serious life events': 'Life Events',
	    'Other things': 'Life Events',
	}

	R.forEach(
		(submission) => {
			R.forEachObjIndexed(
				(value, key) => {
					const category = mapping[key]
					const index = categories.indexOf(category)
					dataset[index] = dataset[index] + 1
				},
				submission.ingredients
			)
		},
		submissions
	)

	return { labels: categories, datasets: [{
		label: 'Total Questions Answered',
		backgroundColor: 'rgba(51, 153, 255, 0.7)',
		borderColor: 'rgb(51, 153, 255)',
		data: dataset
	}] }
}