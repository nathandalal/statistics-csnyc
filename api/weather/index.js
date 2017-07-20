const weather = require("Openweather-Node")
const auth = require('../../config').OWM
const axios = require('axios')

module.exports.getCityWeather = (city = "Boston") => new Promise((resolve, reject) => {
  axios.get(`forecast?q=${city}&APPID=${auth.API_KEY}`, {
    baseURL: "http://api.openweathermap.org/data/2.5/"
  })
  .then(({data}) => {
    resolve(data)
  })
  .catch(e => reject(e))
})
