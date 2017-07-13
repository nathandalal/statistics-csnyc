import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

export default class Mean extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,            name: "Overview",                   icon: "image"},
        {path: "brainstorm",    name: "Brainstorming",              icon: "hourglass-start"},
        {path: "loop",          name: "Looping Over a List",        icon: "list"},
        {path: "finish",        name: "Computing The Mean",         icon: "file-text-o"},
      ], 
    }
  }

  render() {
    let rootPath = "/mean"
    return (
      <div>
        <h1 className="title">Mean</h1>
        <h2 className="subtitle">The average of all elements in a list.</h2>

        <Tabs rootPath={rootPath} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        <div className="columns is-multiline is-desktop">
          <div className="column is-7-widescreen is-12-desktop">
            <div className="content">
              <h6>Nope, nothing on the mean yet!</h6>
              <Link to={`${rootPath}/brainstorm`} className="button is-primary">Brainstorm!</Link>
            </div>
          </div>
          <div className="column is-5-widescreen is-12-desktop">
            <Code fileName={"mean.py"} />
          </div>
        </div>
      </div>
    )
  }
}