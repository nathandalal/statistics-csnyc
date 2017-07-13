import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

export default class Median extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,                name: "Overview",                     icon: "image"},
        {path: "sorting",           name: "What is Sorting?",             icon: "sort-amount-asc"},
        {path: "selection-sort",    name: "Algorithm: Selection Sort",    icon: "crosshairs"},
        {path: "efficiency",        name: "Speeding It Up",               icon: "fighter-jet"},
        {path: "merge-sort",        name: "Algorithm: Merge Sort",        icon: "compress"},
        {path: "finish",            name: "Computing the Median",         icon: "file-text-o"}
      ], 
    }
  }

  render() {
    let rootPath = "/median"
    return (
      <div>
        <h1 className="title">Median</h1>
        <h2 className="subtitle">The middle element of a sorted list.</h2>

        <Tabs rootPath={rootPath} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        <div className="columns is-multiline is-desktop">
          <div className="column is-7-widescreen is-12-desktop">
            <div className="content">
              <h6>Nope, nothing on the median right now!</h6>
              <Link to={`${rootPath}/sorting`} className="button is-primary">Explore Sorting</Link>
            </div>
          </div>
          <div className="column is-5-widescreen is-12-desktop">
            <Code fileName={"median.py"} />
          </div>
        </div>
      </div>
    )
  }
}