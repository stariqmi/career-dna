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

function drawIngredients(start, container) {
	container.innerHTML = '' // Clear

	// Select 3 from start, draw them
	for (let i = start; i < (start + 3); i++) {
		const el = document.createElement('div')
		el.classList.add('ingredient')
		el.classList.add('padding-20')

		const circle = document.createElement('div')
		circle.classList.add('circle')
		// circle.classList.add('small-circle')
		el.appendChild(circle)

		const p = document.createElement('p')
		p.classList.add('centered-text')
		p.innerHTML = paramObj.ingredients[i]
		el.appendChild(p)

		container.appendChild(el)
	}
}

document.getElementById('left').onclick = () => {	
	if (ingredientsStart === 0) return
	else ingredientsStart -= 1

	drawIngredients(ingredientsStart, ingredientsContainer)
}

document.getElementById('right').onclick = () => {
	if (ingredientsStart === (paramObj.ingredients.length - 3)) return
	else ingredientsStart += 1

	drawIngredients(ingredientsStart, ingredientsContainer)
}

drawIngredients(0, ingredientsContainer)