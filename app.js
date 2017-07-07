const express = require('express')
const engines = require('consolidate')

const apiRoutes = require('./api/index')

const app = express()
const port = process.env.PORT || 7777

app.use('/api', apiRoutes)

app.engine('njk', engines.nunjucks)
app.set('view engine', 'njk')
app.set('views', __dirname + '/views')
app.use(express.static('public'))

app.get('*', (req, res) => {
    res.render('pages/index', {
        
    })
})

app.listen(port, function () {
  console.log(`Application listening on port ${port}.`)
})