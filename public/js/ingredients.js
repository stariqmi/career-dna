import request from 'superagent'

const options = {
	'My identity': ['White', 'Black or Latin', 'Asian', 'Other'],
	'My gender': ['Male', 'Female', 'Trans', 'Other'],
	'My parents': ['Both parents went to college', 'One parent went to college', 'No parent went to college', 'First to go to college'],
	'My family': ['Broke', 'Middle Class', 'Upper Middle Class', 'Rich'],
	'How I paid for school': ['No Loans', 'Loans', 'Scholarships, Grants', 'Pell Grants'],
	'Why I chose my school': ['Specific Program', 'Rank / Reputation', 'Cost', 'Family'],
	'My life on campus': ['Mostly lived on campus', 'Worked', 'Fraternities / Sororities', 'Varsity Sports'],
	'My getting used to college': ['Remedial Course', 'Active Campus Life',	'Happy with grades'],
	'Becoming a senior': ['Internships Junior Year', 'Declare Major', 'Job Search', 'No Plans For Jobs'],
	'My major':	['SCIENCE, TECHNOLOGY, ENGINEERING OR MATH', 'ECONOMICS, FINANCE, OR ACCOUNTING', 'FINE ARTS, MUSIC, DRAMA, OR PERFORMING ARTS', 'ENVIRONMENTAL STUDIES, FORESTRY, OR ECOLOGY', 'LIBERAL ARTS, HISTORY, ANY LANGUAGE, OR PHILOSOPHY	PSYCHOLOGY, SOCIOLOGY ...', 'POLITICAL SCIENCE, PUBLIC POLICY, OR GOVERNMENT'],
	'Effects of my student loans': ['WILL TAKE JOB OUTSIDE OF FIELD OF STUDY', 'WILL LESS DESIRABLE JOB', 'WILL WORK MORE THAN ONE JOB', 'WILL WORK MORE HOURS'],
	'My certifications': ['STATE CERTIFICATIONS', 'PROFESSIONAL CERTIFICATIONS', 'JOB REQUIREMENT', 'PART OF COURSE'],
	'Barriers beyond me': ['NO RIGHT CREDENTIALS / GRADES', 'CANT RELOCATE', 'LACK OF CONNECTIONS', 'NO RECRUTUING / CAREER SVCS HELP'],	
	'Serious life events': ['DIVORCE IN FAMILY', 'PARENTS JOB LOSS', 'ILLNESS', 'DEATH'],
	'Other things': [],
}

const icons = {
    'My identity': '/icons/identify.png',
    'My parents': '/icons/parents.png',
    'My gender': '/icons/gender.png',
    'My family': '/icons/family.png',
    'How I paid for school': '/icons/school-paid.png',
    'Why I chose my school': '/icons/school-choice.png',
    'My life on campus': '/icons/campus-life.png',
    'My getting used to college': '/icons/college-life.png',
    'Becoming a senior': '/icons/senior.png',
    'My major': '/icons/major.png',
    'Effects of my student loans': '/icons/student-loans.png',
    'My certifications': '/icons/certifications.png',
    'Barriers beyond me': '/icons/barriers.png',
    'Serious life events': '/icons/serious-life-events.png',
    'Other things': '/icons/other-things.png',
}


const ingredientSelection = {}

let ingredientsStart = 0

const url = window.location.href
const paramString = url.split('?')[1]
const params = paramString.split('&').map(p => decodeURIComponent(p).split('='))

const paramObj = {}
for (let i = 0; i < params.length; i++) {
	paramObj[params[i][0]] = params[i][1]
}

paramObj.gap = parseInt(paramObj.gap)
paramObj.transfer = parseInt(paramObj.transfer)
paramObj.ingredients = paramObj.ingredients.split(',')

const ingredientsContainer = document.getElementsByClassName('ingredients')[0]
const ingredientMenuContainer = document.getElementsByClassName('ingredient-menu')[0]

function drawIngredients(start, container) {
	container.innerHTML = '' // Clear

	// Select 3 from start, draw them
	for (let i = start; i < (start + 3); i++) {
		if (paramObj.ingredients[i]) {
			const el = document.createElement('div')
			el.classList.add('ingredient')
			el.classList.add('padding-20')

			const circle = document.createElement('div')
			circle.classList.add('circle')
			// circle.classList.add('small-circle')
			el.appendChild(circle)

			const img = document.createElement('img')
			img.setAttribute('src', icons[paramObj.ingredients[i]])
			circle.appendChild(img)

			const p = document.createElement('p')
			p.classList.add('centered-text')
			p.innerHTML = paramObj.ingredients[i]
			el.appendChild(p)

			el.onclick = renderIngredientMenu(el, paramObj.ingredients[i], ingredientMenuContainer)

			container.appendChild(el)
		}
	}
}

function onMenuItemClick(ingredient, selection) {
	return function(e) {
		// If already selected for this ingredient
		if (ingredientSelection[ingredient] === selection) return

		ingredientSelection[ingredient] = selection

		const preSelected = document.getElementsByClassName('ingredient-menu--selected')[0]
		if (preSelected) preSelected.classList.remove('ingredient-menu--selected')

		let selected = e.target
		if (selected.nodeName === 'P') selected = selected.parentElement
		selected.classList.add('ingredient-menu--selected')
	}
}

function renderIngredientMenu(element, ingredient, container) {
	return function(e) {
		// Cleanup
		ingredientMenuContainer.innerHTML = '' // Clear
		
		document.getElementById('selected').innerHTML = ingredient

		const menuItems = options[ingredient]

		for (let i = 0; i < menuItems.length; i++) {
			let menuItem = document.createElement('div')
			menuItem.classList.add('ingredient-menu--item')
			menuItem.classList.add('padding-20')
			menuItem.classList.add(ingredient.replace(/\s/g, '-'))

			if (ingredientSelection[ingredient] === menuItems[i]) {
				menuItem.classList.add('ingredient-menu--selected')
			}

			let p = document.createElement('p')
			p.innerHTML = menuItems[i]
			menuItem.appendChild(p)

			container.appendChild(menuItem)

			menuItem.onclick = onMenuItemClick(ingredient, menuItems[i])
		}
	}
}

document.getElementById('left').onclick = () => {	
	if (Object.keys(paramObj.ingredients).length <= 3) return

	if (ingredientsStart === 0) return
	else ingredientsStart -= 1

	drawIngredients(ingredientsStart, ingredientsContainer)
}

document.getElementById('right').onclick = () => {
	if (Object.keys(paramObj.ingredients).length <= 3) return

	if (ingredientsStart === (paramObj.ingredients.length - 3)) return
	else ingredientsStart += 1

	drawIngredients(ingredientsStart, ingredientsContainer)
}

document.getElementById('submit').onclick = (e) => {
	const data = {
		college: paramObj.college,
		transfer: paramObj.transfer,
		gap: paramObj.gap,
		ingredients: ingredientSelection,
	}

	e.target.classList.add('is-loading')
	request.post('/submit')
		.send(data)
		.then((res) => {
			if (res.body.status === 'ok') {
				window.location.href = '/home'
			}
			else {
				alert('Something went wrong!')
			}
		})
}

drawIngredients(0, ingredientsContainer)