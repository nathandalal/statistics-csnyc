import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import NBA from './realdata/nba.jsx'

export default class RealData extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,        name: "What is an API?",           icon: "image"},
        {path: "how",       name: "How to Read Data",          icon: "table"},
        {path: "nba",       name: "Playground: Weather",       icon: "sun-o"},
        {path: "weather",   name: "Playground: NBA Stats",     icon: "dribbble"},
      ]
    }
  }

  render() {
    let rootPath = "/realdata"
    return (
      <div>
        <h1 className="title">APIs for Live Data</h1>
        <h2 className="subtitle">Putting all the knowledge together!</h2>

        <Tabs rootPath={rootPath} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        <div className="columns is-multiline is-desktop">
          <div className="column is-7-widescreen is-12-desktop">
            <div className="content">
              <h6>It's about damn time.</h6>
              <Link to={`${rootPath}/how`} className="button is-primary">Reading Computer Data</Link>
            </div>
          </div>
          <div className="column is-5-widescreen is-12-desktop">
            <NBA />
          </div>
        </div>
      </div>
    )
  }
}