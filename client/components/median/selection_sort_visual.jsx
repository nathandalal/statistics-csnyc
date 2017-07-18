import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-rangeslider'

import ListRenderer from '../list_renderer.jsx'

export default class SelectionSortVisual extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      inputList: "",
      showControls: false,
      list: props.list.slice(),

      delayms: 1000,
      currentOuterIndex: -1,
      currentOuterValue: -1,
      currentInnerIndex: -1,
      currentMinimumIndex: -1,
      changingMinimum: false,
      makingSwap: false,
      changingStartIndex: true,
      makingComparison: false
    }
  }

  resetState(nextList, delayms) {
    this.setState({
      delayms: delayms,
      list: nextList,
      currentOuterIndex: -1,
      currentOuterValue: -1,
      currentInnerIndex: -1,
      currentMinimumIndex: -1,
      changingMinimum: false,
      makingSwap: false,
      changingStartIndex: true,
      makingComparison: false
    })
  }

  buildColorList() {
    return this.props.list.map((n, i) => (i < this.state.currentOuterIndex) ? "#00d1b2" : "")
  }

  changeDelay(seconds) {
    if(this.state.currentOuterIndex < 0 || this.state.currentOuterIndex >= this.props.list.length)
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
      this.resetState(nextProps.list, this.state.delayms)
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
    list = list.slice()
    this.clearTimeouts()
    let delayms = this.state.delayms == 0 ? 100 : this.state.delayms
    let ms = -delayms

    for(let outerIndex = 0; outerIndex < list.length; outerIndex++) {
      this.updateCurrentOuterIndex(outerIndex, list[outerIndex], ms = ms + (delayms * 2))
      this.initCurrentMinimumIndex(outerIndex, ms = ms + delayms)
      let minimumIndex = outerIndex

      for(let innerIndex = outerIndex + 1; innerIndex < list.length; innerIndex++) {
        this.updateCurrentInnerIndex(innerIndex, ms = ms + delayms)
        this.makeComparison(minimumIndex, innerIndex, ms = ms + delayms)
        if(list[innerIndex] < list[minimumIndex]) {
          minimumIndex = innerIndex
          this.updateCurrentMinimumIndex(minimumIndex, ms = ms + delayms)
        }
      }

      let tempValue = list[minimumIndex]
      list[minimumIndex] = list[outerIndex]
      list[outerIndex] = tempValue
      this.updateCurrentList(list.slice(), ms = ms + delayms)

      if(outerIndex == list.length - 1) {
        this.setState({currentInnerIndex: -1})
        this.updateCurrentOuterIndex(outerIndex + 1, null, ms = ms + delayms, true)
      }
    }
  }

  updateCurrentOuterIndex(index, value, delayms, finalUpdate = false) {
    this.timeouts.push(setTimeout((() => {
      if(finalUpdate) this.setState({currentOuterIndex: index, currentInnerIndex: index, currentMinimumIndex: index, makingSwap: false})
      else this.setState({currentOuterIndex: index, makingSwap: false, changingStartIndex: true})
      this.props.updateHighlightStep(finalUpdate ? -8 : 1)
    }).bind(this), delayms))
  }

  initCurrentMinimumIndex(index, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentMinimumIndex: index, changingStartIndex: false})
      this.props.updateHighlightStep(3)
    }).bind(this), delayms))
  }

  updateCurrentInnerIndex(index, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentInnerIndex: index, makingComparison: false, changingMinimum: false})
      this.props.updateHighlightStep(6)
    }).bind(this), delayms))
  }

  makeComparison(minimumIndex, innerIndex, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({makingComparison: true})
      this.props.updateHighlightStep(9)
    }).bind(this), delayms))
  }

  updateCurrentMinimumIndex(index, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({makingComparison: false, changingMinimum: true, currentMinimumIndex: index})
      this.props.updateHighlightStep(10)
    }).bind(this), delayms))
  }

  updateCurrentList(list, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({list: list, makingComparison: false, changingMinimum: false, makingSwap: true})
      this.props.updateHighlightStep(13)
    }).bind(this), delayms))
  }

  updateCurrentCount(delayms) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentCount: parseInt(this.state.currentCount.substr(0, this.state.currentCount.indexOf('+') - 1)) + 1})
    }).bind(this), delayms))
  }



  render() {
    return (
      <div id="selection-sort-visual">
        <button className="button is-small pull-right" 
          onClick={(() => this.setState({showControls: !this.state.showControls})).bind(this)}>
          {this.state.showControls ? "Hide" : "Show"} Controls
        </button>
        <div className="box content">
          <h3 className="title">Visualization: Selection Sort</h3>
          <h5 className="subtitle">Find the minimum, move it to the front.</h5>
          <hr />
          {this.state.showControls ? this.renderAnimationController() : ""}
          {this.state.showControls ? <hr /> : ""}
          {this.renderAnimation()}
        </div>

        <h6>{this.state.currentOuterIndex == this.props.list.length ? "Now that " : "Once "} 
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
          list={this.state.list} 
          activeIndex={this.state.makingSwap ? this.state.currentMinimumIndex : this.state.currentInnerIndex}
          colorList={this.buildColorList()} />
        <div className="columns">
          <div className={`column is-6-desktop is-10-tablet is-offset-${Math.min(parseInt((this.state.currentOuterIndex - 2) * (12 / this.props.list.length)), 6)}`} >
            <div className="box content" style={{maxWidth: "300px"}}>
              {this.state.currentOuterIndex !== this.props.list.length ? 
              <span style={{clear: "both"}} className="tag is-info pull-right">
                {this.state.makingSwap ? `Swapping ${this.state.list[this.state.currentOuterIndex]} with ${this.state.list[this.state.currentMinimumIndex]}` : (
                  this.state.makingComparison ? `Comparing ${this.state.list[this.state.currentInnerIndex]} with ${this.state.list[this.state.currentMinimumIndex]}` : (
                    this.state.changingStartIndex ? "Changing Start Index" : `Moving Through List`))}
              </span> : ""}
              <span style={{clear: "both"}} className={`tag ${this.state.currentOuterIndex == this.props.list.length ? "is-success" : "is-dark"} pull-right`}>
                {this.state.currentOuterIndex == -1 ? "Waiting..." : 
                this.state.currentOuterIndex == this.props.list.length ? "Sorted" : `Start Index: ${this.state.currentOuterIndex}`}
              </span>
              {this.state.currentOuterIndex == this.props.list.length ? (
                <div>
                  <h5 style={{clear:"both"}}>Function Complete</h5>
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
                </div> ) : (
                <div className="content">
                  <h5 style={{clear:"both"}}>Variables</h5>
                  <span>
                    Inner Index
                    <code className="pull-right">
                      {this.state.currentInnerIndex == -1 ? "None" : 
                      `${this.state.currentInnerIndex} -> ${this.state.list[this.state.currentInnerIndex]}`}
                    </code>
                  </span> 
                  <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
                  <span className={this.state.changingMinimum ? "animated jackInTheBox" : ""}>
                    Minimum Index
                    <code className="pull-right">
                      {this.state.currentMinimumIndex == -1 ? "None" : 
                      `${this.state.currentMinimumIndex} -> ${this.state.list[this.state.currentMinimumIndex]}`}
                    </code>
                  </span> 
                </div>
              )} 
            </div>
          </div>
        </div>
      </div>
    )
  }
}