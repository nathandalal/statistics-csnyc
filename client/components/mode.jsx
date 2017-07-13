import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

export default class Mode extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,        name: "Overview",           icon: "image"},
        {path: "counting",  name: "Counting",           icon: "hourglass-start"},
        {path: "table",     name: "Making a Table",     icon: "list"},
        {path: "finish",    name: "Finding the Mode",   icon: "dot-circle-o"},
      ], 
    }
  }

  render() {
    let rootPath = "/mode"
    return (
      <div>
        <h1 className="title">Mode</h1>
        <h2 className="subtitle">The most common element of a list.</h2>

        <Tabs rootPath={rootPath} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        <div className="columns is-multiline is-desktop">
          <div className="column is-7-widescreen is-12-desktop">
            <div className="content">
              <h6>Nope, not done counting up everything I need to do to implement the mode!</h6>
              <Link to={`${rootPath}/counting`} className="button is-primary">Counting Occurences</Link>
            </div>
          </div>
          <div className="column is-5-widescreen is-12-desktop">
            <Code fileName={"mode.py"} />
          </div>
        </div>
      </div>
    )
  }
}