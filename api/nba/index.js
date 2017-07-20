const axios = require('axios')
const auth = require('../../config').MSF
const moment = require('moment')

let transformPlayerName = (playerName) => playerName.toLowerCase().replace(" ", "-")

module.exports.getRoster = (season = "2016-2017-regular", date = moment().subtract(10, 'days').format("YYYYMMDD")) => new Promise((resolve, reject) => {
  axios.get(`${season}/roster_players.json?fordate=${date}`, {
    auth: auth,
    baseURL: "https://api.mysportsfeeds.com/v1.1/pull/nba/",
  })
  .then(({data}) => {
    resolve(data.rosterplayers.playerentry)
  })
  .catch(e => console.error(e))
})