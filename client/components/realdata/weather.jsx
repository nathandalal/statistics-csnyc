import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import moment from 'moment'

export default class Weather extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "Boston"
    }
    this.makeRequest()
  }

  makeRequest() {
    axios.get(`/api/weather/${this.state.city}`)
    .then(({data}) => this.setState({data}))
    .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="content">
        <h6>Weather Component</h6>

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

        <h6>{JSON.stringify(this.state.data)}</h6>
      </div>
    )
  }
}