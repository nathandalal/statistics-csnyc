import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'

import { verifyOneActiveTab, resetActiveTabState } from '../utils/tab_utils.js'

export default class Mean extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {name: "Overview",                  icon: "image"},
        {name: "Brainstorming",             icon: "hourglass-start"},
        {name: "Looping Over a List",       icon: "list"},
        {name: "Computing The Mean",        icon: "file-text-o"},
      ], 
    }
  }

  componentWillMount() {
    this.setState({tabs: resetActiveTabState(this.state.tabs)})
  }

  render() {
    return (
      <div>
        <h1 className="title">Mean</h1>
        <h2 className="subtitle">The average of all elements in a list.</h2>

        <Tabs tabs={this.state.tabs} />

        <div className="columns is-desktop is-gapless">
          <div className="column is-7">
            Nope, nothing on the mean yet!
          </div>
          <div className="column">
            <Code fileName={"mean.py"} highlightIndex={6} />
          </div>
        </div>
      </div>
    )
  }
}