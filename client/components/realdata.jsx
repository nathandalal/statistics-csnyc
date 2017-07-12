import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'

import { verifyOneActiveTab, resetActiveTabState } from '../utils/tab_utils.js'

export default class RealData extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {name: "What is an API?",           icon: "image"},
        {name: "How to Read Data",          icon: "table"},
        {name: "Playground: Weather",       icon: "sun-o"},
        {name: "Playground: NBA Stats",     icon: "dribbble"},
      ], 
    }
  }

  componentWillMount() {
    this.setState({tabs: resetActiveTabState(this.state.tabs)})
  }

  render() {
    return (
      <div>
        <h1 className="title">APIs for Live Data</h1>
        <h2 className="subtitle">Putting all the knowledge together!</h2>

        <Tabs tabs={this.state.tabs} />

        <div className="columns is-desktop is-gapless">
          <div className="column is-7">
            Nothing to currently see here.
          </div>
          <div className="column">
            No code currently available.
          </div>
        </div>
      </div>
    )
  }
}