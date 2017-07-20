const express = require('express')
const engines = require('consolidate')
const path = require('path')
const config = require('./config')

const apiRoutes = require('./api/index')

const app = express()

app.use('/api', apiRoutes)

app.engine('njk', engines.nunjucks)
app.set('view engine', 'njk')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.get('*', (req, res) => {
  res.render('pages/react-template', {
		appname: config.APPNAME
  })
})

app.listen(config.PORT, function () {
  console.log(`Application listening on port ${config.PORT}.`)
})