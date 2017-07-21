const axios = require('axios')
const auth = require('../../config').MSF
const moment = require('moment')
const fs = require('fs')
const path = require('path')

let transformPlayerName = (playerName) => playerName.toLowerCase().replace(" ", "-")

let backupRoster = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'roster_backup.json'), 'utf8'));

let getActiveRoster = (season = "latest", date = moment().subtract(10, 'days').format("YYYYMMDD")) => new Promise((resolve, reject) => {
  axios.get(`${season}/active_players.json?fordate=${date}`, {
    auth: auth,
    baseURL: "https://api.mysportsfeeds.com/v1.1/pull/nba/",
  })
  .then(({data}) => {
    resolve(data.activeplayers)
  })
  .catch(e => console.error(e))
})

module.exports.getRoster = (waittime = 3000) => new Promise((resolve, reject) => {
  //try to send most active data
  getActiveRoster()
  .then(data => resolve(data))
  .catch(e => console.error(e))

  //resolve to backup data if wait longer than 3 seconds
  setTimeout(() => resolve(backupRoster), waittime)
})