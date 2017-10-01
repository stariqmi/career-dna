const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 3030;

const app = express()
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => res.render('main.pug'))
app.get('/ingredients', (req, res) =>   res.render('ingredients.pug'))

app.listen(port, () => console.log(`Server running on port ${port}`))
