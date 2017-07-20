const express = require('express')
const bodyParser = require('body-parser')
var router = express.Router()

router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const PythonCodeHandler = require('./py_code/py_api')

const config = require('../config')

var availableRoutes = [
    {
        title: 'Python Lesson File',
        routename: '/pylessonfiles/:filename',
        methods: ["GET"],
        description: [
            "Gets Python lesson file necessary for code display.",
            "Pass the name of the file without a extension.",
            "Options: mean, median, merge, merge_sort, mode, selection_sort",
            "Output format: JSON object with src and docs as keys, both are arrays of equal length.",
        ]
    }
]

router.get('/', (req, res) => {
    res.render('pages/api-entry', {
        appname: config.APPNAME,
        routes: availableRoutes
    })
})

const internalServerError = 
    (res, reason, source) => res.status(500).send({ error: `Error retrieving data from ${source}.`, reason: reason })
const badUserRequestError = 
    (res, route, reason) => res.status(400).send({ error: `Invalid user request to ${route} API endpoint.`, reason: reason })

router.get(availableRoutes[0].routename, (req, res) => {
    try { return res.send(PythonCodeHandler.getPyFile(req.params.filename)) }
    catch (e) { return badUserRequestError(res, availableRoutes[0].routename, e) }
})

//nothing matched our api requests, return 404
router.get('*', (req, res) => res.status(404).send({ error: 'Invalid API usage. Response not found.' }))

module.exports = router