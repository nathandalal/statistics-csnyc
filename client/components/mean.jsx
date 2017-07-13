import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import ListRenderer from './list_renderer.jsx'
import { generateList } from '../utils/generate_list'

export default class Mean extends React.Component {
  constructor(props) {
    super(props)
    this.rootPath = "/mean"
  }

  componentWillMount() {
    this.state = {
      tabs: [
        {path: null,            name: "Overview",                   icon: "hourglass-start"},
        {path: "loop",          name: "Looping Over a List",        icon: "list"},
        {path: "finish",        name: "Computing The Mean",         icon: "file-text-o"},
      ],
      list: generateList(),
      delayms: 2000,
      currentIndex: -1,
      currentSum: 0,
      currentCount: 0,
      codeHighlightIndex: -1
    }
  }

  componentDidMount() {
    this.timeouts = []
    if(this.props.match.params.tab == "loop") this.runAnimation()
  }

  componentWillUnmount() {
    this.clearTimeouts()
  }

  clearTimeouts() {
    this.timeouts.forEach(clearTimeout)
  }

  runAnimation() {
    this.clearTimeouts()
    let ms = 0
    let delayms = this.state.delayms

    this.state.list.forEach((number, index) => {
      this.updateCurrentIndex(index, 6, ms = ms + delayms)
      this.updateCurrentSumAddition(number, 7, ms = ms + delayms)
      this.updateCurrentSum(number, ms = ms + delayms)
      this.updateCurrentCountAddition(8, ms = ms + delayms)
      this.updateCurrentCount(ms = ms + delayms)
      if(index == this.state.list.length - 1) 
        this.updateCurrentIndex(index + 1, -1, ms = ms + delayms)
    })


  }

  updateCurrentIndex(index, codeHLIndex, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentIndex: index, codeHighlightIndex: codeHLIndex})
    }).bind(this), delayms))
  }

  updateCurrentSumAddition(number, codeHLIndex, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentSum: `${this.state.currentSum} + ${number}`, codeHighlightIndex: codeHLIndex})
    }).bind(this), delayms))
  }

  updateCurrentSum(number, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentSum: parseInt(this.state.currentSum.substr(0, this.state.currentSum.indexOf('+') - 1)) + number})
    }).bind(this), delayms))
  }

  updateCurrentCountAddition(codeHLIndex, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentCount: `${this.state.currentCount} + 1`, codeHighlightIndex: codeHLIndex})
    }).bind(this), delayms))
  }

  updateCurrentCount(delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentCount: parseInt(this.state.currentCount.substr(0, this.state.currentCount.indexOf('+') - 1)) + 1})
    }).bind(this), delayms))
  }

  render() {
    let tabName = this.props.match.params.tab
    return (
      <div>
        <h1 className="title">Mean</h1>
        <h2 className="subtitle">The average of all elements in a list.</h2>

        <Tabs rootPath={this.rootPath} tabs={this.state.tabs} activeTab={tabName} />

        {tabName == "loop" ? this.renderLoop() : (
          tabName == "finish" ? this.renderFinish() : (
            this.renderOverview()
        ))}
      </div>
    )
  }

  renderOverview() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-9-desktop is-12-tablet">
          <div className="content">
            <h3>What is a mean and how do we get it?</h3>
            <p>
              The mean is an average of every element in a list.
              It's a good way to see what number is closest to every element.
            </p>
            <p>
              How do you compute any average? You look for the middle of all the items you have.<br/>
              If you wanted to find the average height of <b>you and your friend</b>, you would <b>add up your heights and divide by 2</b>.
            </p>
            <h3>Definition of Mean</h3>
            <p style={{paddingBottom: "15px"}}>
              You can always <i><b>sum up</b></i> all your individual items in a group or a list.<br/>
              You can <i><b>count up</b></i> all the items as well.
              The mean divides the sum of elements by the number of elements.
            </p>
            <div className="box" style={{maxWidth: "600px"}}>
              <h4 className="title is-4">Formula</h4>
              <div className="columns is-mobile">
                <div className="column is-4"><b style={{paddingRight: "10px"}}>Mean of Numbers</b> =</div>
                <div className="column"><i>Sum of Numbers</i> <hr style={{marginTop:"3px", marginBottom: "3px", maxWidth: "200px"}}/> <i>Amount of Numbers</i></div>
              </div>
            </div>
          </div>
        </div>
        <div className="column content animated fadeIn" style={{
          animationDuration: "3s",
          animationDelay: "1s"
        }}>
          <h6>Let's walkthrough how to compute a mean.</h6>
          <Link to={`${this.rootPath}/loop`} className="button is-primary">Start Visual</Link>
        </div>
      </div>
    )
  }

  renderLoop() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h6>Visual Component</h6>

            <ListRenderer list={this.state.list} activeIndex={this.state.currentIndex} />

            <div className="columns">
              <div className={`column is-6-desktop is-10-tablet is-offset-${Math.min(parseInt(this.state.currentIndex * (12 / this.state.list.length)), 7)}`} >
                <div className="box content" style={{maxWidth: "300px"}}>
                  <span className={`tag ${this.state.currentIndex == this.state.list.length ? "is-success" : "is-dark"} pull-right`}>
                    {this.state.currentIndex == -1 ? "Waiting..." : 
                    this.state.currentIndex == this.state.list.length ? "Complete" : `Current Index: ${this.state.currentIndex}`}
                  </span>
                  <h5 style={{clear:"both"}}>Variables</h5>
                  <span>Sum of Numbers<code className="pull-right">{this.state.currentSum}</code></span> 
                  <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
                  <span>Amount of Numbers<code style={{clear: "both"}}className="pull-right">{this.state.currentCount}</code></span> 
                </div>
              </div>
            </div>

            {this.state.currentIndex == this.state.list.length ? <Link to={`${this.rootPath}/finish`} className="button is-primary animated fadeInLeft">Compute the Average!</Link> : ""}
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"mean.py"} highlightIndex={this.state.codeHighlightIndex} />
        </div>
      </div>
    )
  }

  renderFinish() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h6>All done!</h6>
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"mean.py"} />
        </div>
      </div>
    )
  }
}