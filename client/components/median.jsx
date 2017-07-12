import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'

import { verifyOneActiveTab, resetActiveTabState } from '../utils/tab_utils.js'

export default class Median extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {name: "Overview",                      icon: "image"},
        {name: "What is Sorting?",              icon: "sort-amount-asc"},
        {name: "Algorithm: Selection Sort",     icon: "crosshairs"},
        {name: "Efficiency and Improvement",    icon: "fighter-jet"},
        {name: "Algorithm: Merge Sort",         icon: "compress"},
        {name: "Computing the Median",          icon: "file-text-o"}
      ], 
    }
  }

  componentWillMount() {
    this.setState({tabs: resetActiveTabState(this.state.tabs)})
  }

  render() {
    return (
      <div>
        <h1 className="title">Median</h1>
        <h2 className="subtitle">The middle element of a sorted list.</h2>

        <Tabs tabs={this.state.tabs} />

        <div className="columns is-desktop is-gapless">
          <div className="column is-7">
            Nothing to currently see here.
          </div>
          <div className="column">
            <Code fileName={"median.py"} highlightIndex={3} />
          </div>
        </div>
      </div>
    )
  }
}