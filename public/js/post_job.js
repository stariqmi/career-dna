import request from 'superagent';

const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')
const positionTypeInput = document.getElementById('position')
const roleInput = document.getElementById('role')

const postBtn = document.getElementById('post')
const draftBtn = document.getElementById('draft')

const errorContainer = document.getElementById('error-container')
const error = document.getElementById('error')

errorContainer.style.display = 'none'

const getFormValues = () => {
  const title = titleInput.value
  const description = descriptionInput.value
  const position_type = positionTypeInput.value
  const role_id = roleInput.value

  if (title.length === 0 || description.length === 0) return false

  return { title, description, position_type, role_id }
}

const enableButtons = () => {
  postBtn.disabled = false
  draftBtn.disabled = false

  postBtn.classList.remove('is-loading')
  draftBtn.classList.remove('is-loading')
}

const saveJob = (job) => {
  request.post('/job')
    .send(job)
    .then((res) => {
      if (res.body.status === 'ok') window.location.href = '/jobs'
      else {
        enableButtons()
        showError('Unable to create job')
      }
    })
}

const showError = (message) => {
  error.innerHTML = message
  errorContainer.style.display = 'block'
}

const hideError = () => {
  error.innerHTML = ''
  errorContainer.style.display = 'none'
}

const disableButtons = () => {
  postBtn.disabled = true
  draftBtn.disabled = true
}


postBtn.onclick = (e) => {
  hideError()
  const values = getFormValues()

  if (values) {
    e.target.classList.add('is-loading')
    disableButtons()
    saveJob(Object.assign({}, values, { published: true }))
  }
  else showError('Title or Description cannot be empty')
}

draftBtn.onclick = (e) => {
  hideError()
  const values = getFormValues()

  if (values) {
    e.target.classList.add('is-loading')
    disableButtons()
    saveJob(values)
  }
  else showError('Title or Description cannot be empty')
}