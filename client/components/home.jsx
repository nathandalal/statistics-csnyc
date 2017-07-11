import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { verifyOneActiveTab, resetActiveTabState } from '../utils/tab_utils.js'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {name: "Introduction",          icon: "image"},
        {name: "What You Will Learn",   icon: "hourglass-start"},
        {name: "Get Started",           icon: "play-circle"}
      ]
    }
  }

  componentWillMount() {
    this.setState({tabs: resetActiveTabState(this.state.tabs)})
  }

  render() {
    return (
      <div>
        <h1 className="title">Mean, Median, and Mode</h1>
        <h2 className="subtitle">Get started with understanding lists.</h2>

        <Tabs tabs={this.state.tabs} />

        <div className="columns is-desktop is-gapless">
          <div className="column is-two-thirds">
            {
              this.state.tabs[0].active ? this.renderIntro() :
              this.state.tabs[1].active ? this.renderWhatYouWillLearn() :
              this.state.tabs[2].active ? this.renderGetStarted() : ""
            }
          </div>
          <div className="column is-one-thirds">
            <Code fileName={"mean.py"} />
          </div>
        </div>
      </div>
    )
  }

  renderIntro() {
    return (
      <div> An introduction </div>
    )
  }

  renderWhatYouWillLearn() {
    return (
      <div> What this unit will teach you... </div>
    )
  }

  renderGetStarted() {
    <div> Let's get started! </div>
  }
}