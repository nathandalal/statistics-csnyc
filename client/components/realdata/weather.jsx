import React from 'react'
import axios from 'axios'
import moment from 'moment'
import LeafletMap from './leaflet_map.jsx'

export default class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "Boston"
    }
  }

  componentDidMount() {
    this.makeRequest()
  }

  makeRequest() {
    this.setState({data: null})
    axios.get(`/api/weather/${this.state.city}`)
    .then(({data}) => this.setState({data: data}))
    .catch(e => e)
  }

  render() {
    let { data } = this.state
    let get_mean = (arr) => (arr.reduce((a, b) => a + b )) / arr.length
    let get_median = (arr) => {
      arr.sort((a, b) => a - b)
      let half = Math.floor(arr.length / 2)
      return (arr.length % 2) ? arr[half] : ((arr[half - 1] + arr[half]) / 2.0)
    }
    let get_modes = (arr) => {
      let countMap = {}
      arr.forEach(num => countMap[num] = 0)
      arr.forEach(num => countMap[num] += 1)
      let maxCount = Math.max.apply(null, Object.values(countMap))
      return Object.keys(countMap).filter(key => countMap[key] == maxCount).map(key => parseInt(key, 10))
    }

    let weatherList = data && data.list ? data.list.map(point => parseFloat((1.8 * (point.main.temp - 273) + 32).toFixed(1))) : []
    let mean = data && data.list ? get_mean(weatherList).toFixed(1) : ""
    let median = data && data.list ? get_median(weatherList).toFixed(1) : ""
    let modes = data && data.list ? get_modes(weatherList.map(n => parseInt(n * 10, 10))).map(n => (n / 10.0).toFixed(1)) : ""

    return (
      <div className="content container">
        <h6>
          This page demonstrates how to use API data to run mean, median, and mode analysis
          on the weather forecast for the next five days in any city.
        </h6>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input className="input is-fullwidth" type="text" value={this.state.city} 
              onChange={(({target}) => this.setState({city: target.value})).bind(this)}
              onKeyPress={((e) => e.key === 'Enter' ? this.makeRequest(): null).bind(this)} />
          </div>
          <div className="control">
            <button className="button is-primary"
              onClick={(() => this.makeRequest()).bind(this)}>
              Get Forecast
            </button>
          </div>
        </div>

        {data ? 
        <div>
            <div className="box content container column is-4" style={{maxWidth: "260px", margin: "20px auto"}}>
              <h5 style={{clear:"both"}}>Average Weather</h5>
              <span>Mean<code className="pull-right">{mean}</code></span> 
              <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
              <span>Median<code className="pull-right">{median}</code></span> 
              <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
              <span>Modes<code className="pull-right">{modes.length <= 3 ? modes.join(", ") : "More than 3 modes."}</code></span>
            </div>
            <LeafletMap lat={data.city.coord.lat} lng={data.city.coord.lon} height="350" />
            <div className="columns is-multiline" style={{marginTop: "20px"}}>
            {data.list.map(point => (
              <div className="box content container column is-4" style={{maxWidth: "300px", margin: "20px auto"}}
                key={point.dt}>
                <h5 className="title is-5">{moment.unix(point.dt).format("dddd, MMMM Do @ h A")}</h5>
                <h6 className="subtitle is-6">{this.renderCorrectIcon(point.weather[0].main)}</h6>
                <h6>{(1.8 * (point.main.temp - 273) + 32).toFixed(1)} &deg;F</h6>
              </div>
            ))}
          </div>
        </div> : 
        <div className="container content has-text-centered">
          <h4>Loading weather for {this.state.city}</h4>
          <p>
            <span className="icon is-large"><i className="fa fa-sun-o fa-spin"/></span>
          </p>
        </div>}
      </div>
    )
  }

  renderCorrectIcon(weatherString) {
    let iconStr = weatherString == "Rain" ? "tint" : (
      weatherString == "Snow" ? "snowflake-o" : (
        weatherString == "Clear" ? "sun-o" : (
          weatherString == "Clouds" ? "cloud" : (
            "sun-o"))))

    return <span>{weatherString} <span className="icon is-small"><i className={`fa fa-${iconStr}`} /></span></span>

  }
}