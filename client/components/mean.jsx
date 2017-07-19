import React from 'react'
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import SummationVisual from './mean/summation_visual.jsx'
import ListRenderer from './list_renderer.jsx'
import { generateList } from '../utils/generate_list'

import MeanQuiz from './mean/mean_quiz.jsx'

export default class Mean extends React.Component {
  constructor(props) {
    super(props)
    this.rootPath = "/mean"
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    this.state = {
      tabs: [
        {path: null,            name: "Summing and Counting for the Mean",    icon: "list"},
        {path: "quiz",          name: "Quiz",                                 icon: "pencil"}
      ],
      list: generateList(),
      highlightIndex: -1
    }
  }

  changeList(list = []) {
    this.setState({list: list.length > 0 ? list : generateList()})
  }

  updateHighlightStep(step) {
    this.setState({highlightIndex: step + 7})
  }

  render() {
    let tabName = this.props.match.params.tab
    return (
      <div>
        <h1 className="title">Mean</h1>
        <h2 className="subtitle">The average of all elements in a list.</h2>

        <Tabs rootPath={this.rootPath} tabs={this.state.tabs} activeTab={tabName} />

        {tabName == "quiz" ? <MeanQuiz/> : (
          <div>
            {this.renderOverview()}
            {this.renderLoop()}
            {this.renderFinish()}
            {this.renderQuizButton()}
          </div>
        )}
      </div>
    )
  }

  renderOverview() {
    return (
      <div className="content">
        <h3>What is a mean?</h3>
        <p>
          The mean is an average of every element in a list.
          It's a good way to see what number is closest to every element.
        </p>
        <h3>Why do we care?</h3>
        <p>
          The mean is an average of every element in a list.
          It's a good way to see what number is closest to every element.
        </p>
        <h3>Defining the Mean</h3>
        <p>
          How do you compute any average? You look for the middle of all the items you have.<br/>
          If you wanted to find the average height of <b>you and your friend</b>, you would <b>add up your heights and divide by 2</b>.
        </p>
        <p style={{paddingBottom: "15px"}}>
          You can always <i><b>sum up</b></i> all your individual items in a group or a list.<br/>
          You can <i><b>count up</b></i> all the items as well.
          The mean divides the sum of elements by the number of elements.
        </p>
        <div className="box" style={{maxWidth: "400px"}}>
          <h4 className="title is-4">Formula</h4>
          <div className="columns is-mobile">
            <div className="column is-half"><b style={{paddingRight: "10px"}}>Mean of Numbers</b> =</div>
            <div className="column is-half"><i>Sum of Numbers</i> <hr style={{marginTop:"3px", marginBottom: "3px", maxWidth: "170px"}}/> <i>Count of Numbers</i></div>
          </div>
        </div>
      </div>
    )
  }

  renderLoop() {
    return (
      <div id="summation" className="columns is-multiline is-desktop" style={{marginTop: "80px"}}>
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Looping Over a List</h3>
            <h6>
            In order to calculate the mean, we need to know the <b>sum of all elements</b> and <b>how many elements there are</b>.
            Follow along with the animation and see how the mean is computed.
            </h6>
            <SummationVisual list={this.state.list} 
              changeList={this.changeList.bind(this)} 
              updateHighlightStep={this.updateHighlightStep.bind(this)}  />
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"mean.py"} highlightIndex={this.state.highlightIndex} />
        </div>
      </div>
    )
  }

  renderFinish() {
    let sum = this.state.list.reduce((a, b) => a + b, 0)
    let len = this.state.list.length
    return (
      <div className="columns is-multiline is-desktop" style={{marginTop: "80px"}}>
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Calculating the Mean</h3>
            <h5>We have all the data we need from our list!</h5>
            <ListRenderer list={this.state.list} />

            <div className="card" style={{maxWidth:"400px"}}>
              <header className="card-header">
                <p className="card-header-title">
                  Variables
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <span>Sum of Numbers<code className="pull-right">{sum}</code></span> 
                  <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
                  <span>Count of Numbers<code style={{clear: "both"}}className="pull-right">{len}</code></span>
                  {this.state.showMeanFirstTime || this.state.showMeanSecondTime ? <hr /> : ""}
                </div>
              </div>
            </div>

            <h5 style={{paddingTop: "20px"}}>Now we simply divide the two numbers and get the result.</h5>
            <div className="content box animated fadeIn" style={{maxWidth:"400px"}}>
              <h6>
                Mean of Numbers<code className="pull-right">{sum / len}</code>
              </h6>
              <small>The mean is a decimal number. Don't forget the remainder!</small>
            </div>

          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"mean.py"} highlightIndex={13}/>
        </div>
      </div>
    )
  }

  renderQuizButton() {
    return (
      <div className="content animated fadeIn" style={{animationDuration: "3s", marginTop: "20px"}}>
        <hr/>
        <h5>Let's test what you've learned.</h5>
        <Link to={`${this.rootPath}/quiz`} className="button is-primary is-large">Test Your Mean Skills!</Link>
      </div>
    )
  }
}