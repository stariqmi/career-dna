const circleOptions = document.getElementsByClassName('circle-option')

const formValues = {
  college: 'Amherst College',
  isTransferStudent: false,
  tookGapYear: false,
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
document.getElementById('transfer-student').onchange = (e) => formValues.isTransferStudent = (e.target.value === '1')
document.getElementById('gap-year').onchange = (e) => formValues.tookGapYear = (e.target.value === '1')

document.getElementById('submit').onclick = (e) => {
  console.log(formValues)
  console.log(selected)
}