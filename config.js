if (process.env.NODE_ENV != 'production') require('dotenv').load()

module.exports = {
	APPNAME: process.env.APPNAME || 'Example App',
  PORT: process.env.PORT || 7777,
  DEVMODE: (process.env.NODE_ENV != 'production'),
  MSF: {
    username: process.env.MSF_USERNAME,
    password: process.env.MSF_PASSWORD
  },
  OWM: {
    API_KEY: process.env.OWM_API_KEY
  }
}