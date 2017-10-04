import Chart from 'chart.js'
import request from 'superagent'

const ctx = document.getElementById('radarChart').getContext('2d');

request.get('/radar_chart_data')
	.then((res) => {
		new Chart(ctx, {
			type: 'radar',
			data: res.body,
		})
	})