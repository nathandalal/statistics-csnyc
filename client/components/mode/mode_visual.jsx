import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-rangeslider'
import CopyToClipboard from 'react-copy-to-clipboard'

import ListRenderer from '../list_renderer.jsx'

export default class ModeVisual extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputList: "",
      showControls: false,

      delayms: 1000,
      countMap: {},
      currentIndex: -1, 
      activeKey: -1,
      modes: [],
      maxCount: 0
    }

    this.KEY_SENTINEL = 11
  }

  resetState(delayms) {
    this.setState({
      delayms: delayms,
      countMap: {},
      currentIndex: -1, 
      activeKey: -1,
      modes: [],
      maxCount: 0
    })
  }

  buildColorList() {
    return this.props.list.map((n, i) => (i < this.state.currentIndex) ? "primary" : "warning")
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

    let copyMap = {}
    let maxCount = 0
    let modes = []

    list.forEach((number, index) => {
      this.updateCurrentIndex(index, ms = ms + delayms)
      this.updateActiveKey(number, ms = ms + delayms)
      this.updateCountMapAtKey(number, ms = ms + delayms)
      if(index == list.length - 1) {
        this.updateCurrentIndex(index + 1, ms = ms + delayms)
      }

      if(copyMap[number]) copyMap[number] += 1
      else copyMap[number] = 1
    })

    Object.keys(copyMap).forEach(key => {
      this.updateActiveKey(key, ms = ms + delayms, false)
      this.makeGreaterComparison(copyMap[key], ms = ms + delayms)

      if(maxCount < copyMap[key]) {

        modes = [key]
        maxCount = copyMap[key]
        this.updateModes(modes, maxCount, ms = ms + delayms, true)

      } else {

        this.makeEqualComparison(copyMap[key], ms = ms + delayms)
        if(maxCount == copyMap[key]) {
          modes = modes.slice()
          modes.push(key)
          this.updateModes(modes, maxCount, ms = ms + delayms, false)
        }

      }
    })

    this.updateActiveKey(this.KEY_SENTINEL, ms = ms + delayms, true)
  }

  updateCurrentIndex(index, delayms, finalUpdate = false) {
    this.timeouts.push(setTimeout((() => {
      this.setState({currentIndex: index})
      this.props.updateHighlightStep(index == this.props.list.length ? 8 : 1)
    }).bind(this), delayms))
  }

  updateActiveKey(number, delayms, initMap = true) {
    this.timeouts.push(setTimeout((() => {
      this.setState({activeKey: number})
      this.props.updateHighlightStep(number == this.KEY_SENTINEL ? -8 : (initMap ? 2 : 9))
    }).bind(this), delayms))
  }

  updateCountMapAtKey(number, delayms) {
    this.timeouts.push(setTimeout((() => {
      let copyMap = Object.assign({}, this.state.countMap)
      this.props.updateHighlightStep(copyMap[number] ? 3 : 5)
      if(copyMap[number]) copyMap[number] += 1
      else copyMap[number] = 1
      this.setState({ countMap: copyMap, activeKey: -1 })
    }).bind(this), delayms))
  }

  makeGreaterComparison(count, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.props.updateHighlightStep(10)
    }).bind(this), delayms))
  }

  makeEqualComparison(count, delayms) {
    this.timeouts.push(setTimeout((() => {
      this.props.updateHighlightStep(12)
    }).bind(this), delayms))
  }

  updateModes(modes, maxCount, delayms, greaterComparison) {
    this.timeouts.push(setTimeout((() => {
      this.props.updateHighlightStep(greaterComparison ? 11 : 13)
      this.setState({ modes: modes, maxCount: maxCount })
    }).bind(this), delayms))
  }

  render() {
    return (
      <div id="summation-visual">
        {this.renderTopButtons()}
        <div className="box">
          <h3 className="title is-4">Visualization: Counting Occurences and Finding Modes (Incomplete)</h3>
          <hr />
          {this.state.showControls ? this.renderAnimationController() : ""}
          {this.state.showControls ? <hr /> : ""}
          {this.renderAnimation()}
        </div>

        <h6><strong>{this.state.currentIndex == this.props.list.length ? "Now that " : "Once "}</strong> 
          we have found all of our modes, we are done!
        </h6>
      </div>
    )
  }

  renderTopButtons() {
    return (
      <div className="block pull-right">
        <CopyToClipboard text={this.props.list.join(", ")} onCopy={this.onCopy}>
          <button className="button is-small">Copy List</button>
        </CopyToClipboard>
        <button className="button is-small" 
          onClick={(() => this.setState({showControls: !this.state.showControls})).bind(this)}>
          {this.state.showControls ? "Hide" : "Show"} Controls
        </button>
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
    let { countMap } = this.state

    let table_rows = Object.keys(countMap).map(key => (
      <tr key={key} className={this.state.activeKey == key ? "is-selected" : ""}>
        <td>{key}</td>
        <td>{countMap[key]}</td>
      </tr>
    ))
    if (!(this.state.activeKey == -1 || 
        this.state.activeKey == this.KEY_SENTINEL ||
        this.state.countMap[this.state.activeKey]))
      table_rows.push((
        <tr className="is-selected" key={this.state.activeKey}>
          <td>{this.state.activeKey}</td>
          <td>New</td>
        </tr>
      ))

    return (
      <div style={{clear:"both", minHeight: "350px"}}>
        <ListRenderer 
          list={this.props.list} 
          activeIndex={this.state.currentIndex}
          colorList={this.buildColorList()} />
        <div className="content">
          <div className="columns" style={{clear: 'both'}}>
            <div className="column">
              <table className="table is-striped is-narrow">
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Occurences</th>
                  </tr>
                </thead>
                  <tbody>{table_rows}</tbody>
              </table>
            </div>
            <div className="column">
              <div className="box content" style={{maxWidth: "300px", margin: "0 auto"}}>
                <div className="content">
                  <span className={`tag ${this.state.currentIndex == this.props.list.length ? (this.state.activeKey == this.KEY_SENTINEL ? "is-primary" : "is-info") : "is-light"} pull-right`}>
                    {this.state.currentIndex == -1 ? "Waiting..." : 
                    (this.state.currentIndex == this.props.list.length ? (this.state.activeKey == this.KEY_SENTINEL ? "Complete" : "Step 2: Finding Modes")
                    : `Step 1: Counting Occurences`)}
                  </span>
                  <h5 style={{clear: "both", paddingTop: "10px"}}>Mode Variables</h5>
                  {this.state.currentIndex == this.props.list.length ? ( <div>
                    <span>Modes<code className="pull-right">{this.state.modes.length > 0 ? this.state.modes.join(", ") : "None"}</code></span> 
                    <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
                    <span>Maximum Occurence<code style={{clear: "both"}}className="pull-right">{this.state.maxCount}</code></span>
                  </div> ) : "Finding modes not started yet."}
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}