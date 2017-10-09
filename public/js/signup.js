import request from 'superagent'

const errorContainer = document.getElementById('error-container')
const errorBody = document.getElementById('error')

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const passwordConfirmInput = document.getElementById('confirm-password')

const submit = document.getElementById('submit')

errorContainer.style.display = 'none'

const checkIfPasswordsMatch = (password, passwordConfirm) => {
	return password === passwordConfirm
}

const showError = (error) => {
	errorContainer.style.display = 'block'
	errorBody.innerText = error
}

const hideError = () => {
	errorContainer.style.display = 'none'
}

const validEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

submit.onclick = () => {
	const username = emailInput.value
	const password = passwordInput.value
	const passwordConfirm = passwordConfirmInput.value

	if (username.length === 0) {
		showError('Email cannot be empty')
		return
	}

	if (password.length === 0) {
		showError('Password cannot be empty')
		return
	}

	const passwordMatch = checkIfPasswordsMatch(password, passwordConfirm)
	if (!validEmail(username)) {
		showError('Invalid email address')
		return
	}

	if (!passwordMatch) {
		showError('Passwords do not match')
		return
	}

	request.post('/signup')
		.send({ username, password })
		.then((res) => {
			if (res.body.status === 'ok') window.location.href = '/'
			else {
				console.log(res)
			}
		})
		.catch((err) => {
			showError('User with email already exists')
		})
}