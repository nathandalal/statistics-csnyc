const express = require('express')
const bodyParser = require('body-parser')
var router = express.Router()

router.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const PythonCodeHandler = require('./py_code/index')
const NBAHandler = require('./nba/index')
const WeatherHandler = require('./weather/index')

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
    },
    {
        title: 'NBA Roster',
        routename: '/nba/roster',
        methods: ["GET"],
        description: [
            "Gets list of every NBA player currently on a roster.",
        ]
    },
    {
        title: 'Weather Data',
        routename: '/weather/:city',
        methods: ["GET"],
        description: [
            "Gives list of weather data for 5 days at 3 hour intervals for the given city.",
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
    (res, route, reason) => res.status(500).send({ error: `Error retrieving data from ${route}.`, reason: reason })
const badUserRequestError = 
    (res, route, reason) => res.status(400).send({ error: `Invalid user request to ${route} API endpoint.`, reason: reason })

router.get(availableRoutes[0].routename, (req, res) => {
    try { return res.send(PythonCodeHandler.getPyFile(req.params.filename)) }
    catch (e) { return badUserRequestError(res, availableRoutes[0].routename, e) }
})

router.get(availableRoutes[1].routename, (req, res) => {
    NBAHandler.getRoster(req.query.waittime)
    .then(data => res.send(data))
    .catch(e => internalServerError(res, availableRoutes[2].routename, e))
})

router.get(availableRoutes[2].routename, (req, res) => {
    WeatherHandler.getCityWeather(req.params.city)
    .then(data => res.send(data))
    .catch(e => badUserRequestError(res, availableRoutes[2].routename, e))
})

//nothing matched our api requests, return 404
router.get('*', (req, res) => res.status(404).send({ error: 'Invalid API usage. Response not found.' }))

module.exports = router