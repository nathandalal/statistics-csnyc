import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'

import { verifyOneActiveTab, resetActiveTabState } from '../utils/tab_utils.js'

export default class Mode extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {name: "Overview",                  icon: "image"},
        {name: "Counting",                  icon: "hourglass-start"},
        {name: "Making a Table",            icon: "list"},
        {name: "Finding the Mode",          icon: "dot-circle-o"},
      ], 
    }
  }

  componentWillMount() {
    this.setState({tabs: resetActiveTabState(this.state.tabs)})
  }

  render() {
    return (
      <div>
        <h1 className="title">Mode</h1>
        <h2 className="subtitle">The most common element of a list.</h2>

        <Tabs tabs={this.state.tabs} />

        <div className="columns is-desktop is-gapless">
          <div className="column is-7">
            Nothing to currently see here.
          </div>
          <div className="column">
            <Code fileName={"mode.py"} highlightIndex={3} />
          </div>
        </div>
      </div>
    )
  }
}