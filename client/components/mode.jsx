import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import ModeVisual from './mode/mode_visual.jsx'
import ModeQuiz from './mode/mode_quiz.jsx'

import ListRenderer from './list_renderer.jsx'
import { generateList } from '../utils/generate_list'

export default class Mode extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    this.state = {
      tabs: [
        {path: null,                name: "Counting for the Mode",        icon: "cubes"},
        {path: "quiz",              name: "Quiz",                         icon: "pencil"}
      ], 
      list: generateList(8, 1, 10),
      highlightIndex: 3
    }
  }

  changeList(list = []) {
    this.setState({list: list.length > 0 ? list : generateList(8, 1, 10)})
  }

  updateHighlightStepSelectionSort(step) {
    this.setState({highlightIndex: step + 5})
  }

  render() {
    let tabName = this.props.match.params.tab
    return (
      <div>
        <h1 className="title">Mode</h1>
        <h2 className="subtitle">The most common element of a list.</h2>

        <Tabs rootPath={"/mode"} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        {tabName == "quiz" ? <ModeQuiz/> : (
          <div>
            {this.renderOverview()}
            {this.renderModeVisual()}
            {this.renderQuizButton()}
          </div>
        )}
      </div>
    )
  }

  renderOverview() {
    return (
      <div className="content">
        <h3>What is the mode?</h3>
        <h6>
          The mode is yet another way to measure typical performance, and it is quite <b>simple</b>.
          The mode looks at the most common element in the list.
        </h6>
        <h6>
          When the mode is quite far away from the mean or median, it's evidence that the mean, median, and mode may not be great indicators of a typical list element.
        </h6>
        <h3>Why can't we just use the mean or median?</h3>
        <h6>
          The mode is useful when, instead of typical performance over all elements, we want to look at <b>an event or an element that occurs or appears most often</b>.
        </h6>
        <h6>  
          Mean and median results can be verified by calculating the mode. Many times, if the mode is closer to the mean or the median, it may tell you that one of the two metrics is better. 
          The mode sometimes also succeeds where calculating the mean or median may not work as well.
        </h6>
        <ul className="fa-ul">
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-dribbble"></i>Find the NBA team with the most championships.
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-user"></i>Based on a list of votes, figure out who won an election.
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-bug"></i>How many legs do bugs normally have?
          </li>
        </ul>
        <h3>Definition of the Mode</h3>
        <h6>
          Here are the steps needed to calculate the mode of a list.
        </h6>
        <ol>
          <li>Count how many times every number appears.</li>
          <li>Pick the number with the most appearances in the list.</li>
          <li>You now have the mode of a list!</li>
        </ol>

      </div>
    )
  }

  renderModeVisual() {
    return (
      <div id="counting" className="columns is-multiline is-desktop" style={{marginTop: "80px"}}>
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Counting Occurences</h3>
            <h6>
              This animation shows how we can count how many times each number appears.
            </h6>
            <ModeVisual list={this.state.list} 
              changeList={this.changeList.bind(this)} 
              updateHighlightStep={this.updateHighlightStepSelectionSort.bind(this)}  />
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"mode.py"} highlightIndex={this.state.highlightIndex}
            showCode={this.props.showCode} setShowCode={this.props.setShowCode} />
        </div>
      </div>
    )
  }

  renderQuizButton() {
    return (
      <div className="content animated fadeIn" style={{animationDuration: "3s", marginTop: "20px"}}>
        <hr/>
        <h5>Let's test what you've learned.</h5>
        <Link to='/mode/quiz' className="button is-primary is-large">Quiz The Mode!</Link>
      </div>
    )
  }
}