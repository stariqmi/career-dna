const R = require('ramda')

/*
	Data as array of submissions
	Format:
	[
		{
			college: String,
			gap: Boolean,
			transfer: Boolean,
			ingredients: { String: String } // Example { Identity: White }
		}
	]
*/
module.exports = function(data) {
	let groupCount = 1
	let nodeCount = 0
	const groups = {}
	const nodes = {}
	const nodeList = []
	const nodeKeys = {}
	const links = {}

	R.forEach(
		(submission) => {
			R.forEachObjIndexed(
				(value, key) => {
					let groupNo
					if (groups[key]) {
						groupNo = groups[key]
					}
					else {
						groupNo = groupCount
						groups[key] = groupCount
						groupCount++
					}

					if (nodes[value] === undefined) {
						nodeList.push({name: value, group: groupNo, groupName: key })
						nodes[value] = nodeCount 
						nodeCount++
					}

					R.forEachObjIndexed(
						(value2, key2) => {
							if (value === value2) return
							else {
								const linkKey = `${value}#${value2}`
								if (links[linkKey]) links[linkKey] = links[linkKey] + 1
								else links[linkKey] = 1
							}
						},
						submission.ingredients,
					)
				},
				submission.ingredients
			)
		},
		data,
	)

	const linksArr = []
	R.forEachObjIndexed(
		(value, key) => {
			const keyParts = key.split('#')
			linksArr.push({ source: nodes[keyParts[0]], target: nodes[keyParts[1]], value })
		},
		links,
	)

	return { nodes: nodeList, links: linksArr }
}