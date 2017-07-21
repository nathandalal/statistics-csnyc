import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import NBA from './realdata/nba.jsx'
import Weather from './realdata/weather.jsx'

export default class RealData extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,        name: "How Do Computers Talk?",           icon: "table"},
        {path: "weather",   name: "Playground: Weather Forecast",     icon: "sun-o"},
        {path: "nba",       name: "Playground: NBA Rosters",          icon: "dribbble"}
      ]
    }
  }

  render() {
    let tabName = this.props.match.params.tab
    return (
      <div>
        <h1 className="title">APIs for Live Data</h1>
        <h2 className="subtitle">Putting all the knowledge together!</h2>

        <Tabs rootPath="/realdata" tabs={this.state.tabs} activeTab={tabName} />

        {tabName == "weather" ? <Weather /> : (
          tabName == "nba" ? <NBA /> : (
            <div className="content">
              <h6>It's about damn time.</h6>
              <div className="block">
                <Link to="/realdata/weather" className="button is-primary is-medium">Weather Activity</Link>
                <span style={{padding: "2px"}} />
                <Link to="/realdata/nba" className="button is-warning is-medium">NBA Activity</Link>
              </div>
            </div>
        ))}

      </div>
    )
  }
}