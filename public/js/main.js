const circleOptions = document.getElementsByClassName('circle-option')

const formValues = {
  college: 'Amherst College',
  isTransferStudent: 0,
  tookGapYear: 0,
}

const selected = {}

for (let i = 0; i < circleOptions.length; i++) {
  const option = circleOptions[i]
  option.onclick = (e) => {
    const circle = option.childNodes[0]
    const text = option.childNodes[1].textContent

    if (circle.classList.contains('option-selected')) {
      circle.classList.remove('option-selected')
      delete selected[text]
    }
    else {
      circle.classList.add('option-selected')
      selected[text] = 1
    }
  }
}

document.getElementById('college').onchange = (e) => formValues.college = e.target.value
document.getElementById('transfer-student').onchange = (e) => formValues.isTransferStudent = parseInt(e.target.value)
document.getElementById('gap-year').onchange = (e) => formValues.tookGapYear = parseInt(e.target.value)

document.getElementById('submit').onclick = (e) => {
  const selectedAsArray = Object.keys(selected).map(s => `${s}`).join(',')

  let url = `/ingredients?college=${formValues.college}&transfer=${formValues.isTransferStudent}&gap=${formValues.tookGapYear}`
  url += `&ingredients=${selectedAsArray}`

  window.location.href = url
}