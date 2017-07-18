import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-rangeslider'

import ListRenderer from '../list_renderer.jsx'

export default class SummationVisual extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputList: "",
      showControls: false,

      delayms: 1000,
      currentIndex: -1, 
      currentSum: 0,
      currentCount: 0
    }
  }

  resetState(delayms) {
    this.setState({
      delayms: delayms,
      currentIndex: -1,
      currentSum: 0,
      currentCount: 0
    })
  }

  buildColorList() {
    return this.props.list.map((n, i) => (i < this.state.currentIndex) ? "#23d160" : "")
  }

  changeDelay(seconds) {
    if(this.state.currentIndex < 0 || this.state.currentIndex >= this.props.list.length)
      this.setState({delayms: val * 1000})
  }

  setAnimationControls(enterPress = false) {
    if (this.state.inputList == "" && !enterPress)  {
      this.props.changeList()
    }
    else {
      let newList = this.state.inputList.split(',')
      if(newList.length >= 3) {
        try {this.props.changeList(newList.map(str => parseInt(str.trim(), 10)))}
        catch (e) {console.log(e)}
      }
      else if (!enterPress) this.props.changeList()
      this.setState({inputList: ""})
    }
  }


  componentWillReceiveProps(nextProps) {
    let l1 = this.props.list
    let l2 = nextProps.list
    if (!(l1.length==l2.length && l1.every((v,i)=> v === l2[i]))) {
      this.resetState(this.state.delayms)
      this.clearTimeouts()
      this.runAnimation(nextProps.list)
    }
  }

  componentDidMount() {
    this.timeouts = []
    this.runAnimation()
  }

  componentWillUnmount() {
    this.clearTimeouts()
  }

  clearTimeouts() {
    this.timeouts.forEach(clearTimeout)
  }

  runAnimation(list = this.props.list) {
    this.clearTimeouts()
    let delayms = this.state.delayms == 0 ? 100 : this.state.delayms
    let ms = -delayms

    list.forEach((number, index) => {
      this.updateCurrentIndex(index, ms = ms + delayms)
      this.updateCurrentSumAddition(number, ms = ms + delayms)
      this.updateCurrentSum(number, ms = ms + delayms)
      this.updateCurrentCountAddition(ms = ms + delayms)
      this.updateCurrentCount(ms = ms + delayms)
      if(index == list.length - 1) {
        this.updateCurrentIndex(index + 1, ms = ms + delayms, true)
      }
    })
  }

  updateCurrentIndex(index, delayms, finalUpdate = false) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentIndex: index})
      this.props.updateHighlightStep(finalUpdate ? -8 : 1)
    }).bind(this), delayms))
  }

  updateCurrentSumAddition(number, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentSum: `${this.state.currentSum} + ${number}`})
      this.props.updateHighlightStep(2)
    }).bind(this), delayms))
  }

  updateCurrentSum(number, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentSum: parseInt(this.state.currentSum.substr(0, this.state.currentSum.indexOf('+') - 1)) + number})
    }).bind(this), delayms))
  }

  updateCurrentCountAddition(delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentCount: `${this.state.currentCount} + 1` })
      this.props.updateHighlightStep(3)
    }).bind(this), delayms))
  }

  updateCurrentCount(delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentCount: parseInt(this.state.currentCount.substr(0, this.state.currentCount.indexOf('+') - 1)) + 1})
    }).bind(this), delayms))
  }



  render() {
    return (
      <div id="summation-visual">
        <button className="button is-small pull-right" 
          onClick={(() => this.setState({showControls: !this.state.showControls})).bind(this)}>
          {this.state.showControls ? "Hide" : "Show"} Controls
        </button>
        <div className="box">
          <h3 className="title is-4">Visualization: How to Sum Up a List</h3>
          <hr />
          {this.state.showControls ? this.renderAnimationController() : ""}
          {this.state.showControls ? <hr /> : ""}
          {this.renderAnimation()}
        </div>

        <h6>{this.state.currentIndex == this.props.list.length ? "Now that " : "Once "} 
          we have the sum and the total count of numbers, we have all we need to compute the mean!
        </h6>
      </div>
    )
  }

  renderAnimationController() {
    return (
      <div className="columns is-multiline is-mobile" style={{clear:"both"}}>
        <div className="column is-4-tablet is-6-mobile">
          <h6>
            Animation Delay (Seconds)<br/>
            <small>Changes take effect on restart.</small>
          </h6>
          <Slider min={0} max={5} step={0.5} value={this.state.delayms * 1.0 / 1000}
            onChange={((val) => this.setState({delayms: val * 1000})).bind(this)} />
        </div>
        <div className="column is-4-tablet is-6-mobile">
          <h6>
            Input List<br/>
            <small>Please enter at least 3 numbers.</small>
          </h6>
          <input className="input" type="text" placeholder="1, 2, 3, 4" value={this.state.inputList}
            onChange={((event) => this.setState({inputList: event.target.value})).bind(this)}
            onKeyPress={((e) => e.key === 'Enter' ? this.setAnimationControls(true) : null).bind(this)} />
        </div>
        <div className="column">
          <p className="field">
            <a className="button is-primary is-outlined"
              onClick={(() => this.setAnimationControls()).bind(this)}>
              <span className="icon">
                <i className="fa fa-refresh"></i>
              </span>
              <span>
                Restart Animation 
                <small> {this.state.inputList.length > 0 ? "(Input List)": "(Random)"}</small>
              </span>
            </a>
          </p>
        </div>
      </div>
    )
  }

  renderAnimation() {
    return (
      <div style={{clear:"both"}}>
        <ListRenderer 
          list={this.props.list} 
          activeIndex={this.state.currentIndex}
          colorList={this.buildColorList()} />
        <div className="columns">
          <div className={`column is-6-desktop is-10-tablet is-offset-${Math.min(parseInt((this.state.currentIndex - 2) * (12 / this.props.list.length)), 6)}`} >
            <div className="box content" style={{maxWidth: "300px"}}>
              <span className={`tag ${this.state.currentIndex == this.props.list.length ? "is-success" : "is-dark"} pull-right`}>
                {this.state.currentIndex == -1 ? "Waiting..." : 
                this.state.currentIndex == this.props.list.length ? "Complete" : `Current Index: ${this.state.currentIndex}`}
              </span>
              <div className="content">
                <h5 style={{clear:"both"}}>Variables</h5>
                <span>Sum of Numbers<code className="pull-right">{this.state.currentSum}</code></span> 
                <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
                <span>Count of Numbers<code style={{clear: "both"}}className="pull-right">{this.state.currentCount}</code></span>
              </div> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}