import Chart from 'chart.js'

const multiple = window.criteriaMultiple // From template
const matches = JSON.parse(window.matches.replace(/&quot;/g, '"')) // From template

const ctx = document.getElementById('bubbleChart').getContext('2d')

console.log(matches)
const datasets = matches.map((match) => {
  const data = {
    label: match.userId,
    data: [
      {
        x: (match.score / multiple) / 100,
        y: match.score / 100,
        r: match.choiceCount,
      }
    ]
  }

  return data
})

console.log(datasets)

new Chart(ctx, {
  type: 'bubble',
  data: { datasets },
})