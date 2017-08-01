import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import SelectionSortVisual from './median/selection_sort_visual.jsx'
import MedianQuiz from './median/median_quiz.jsx'

import ListRenderer from './list_renderer.jsx'
import { generateList } from '../utils/generate_list'

export default class Median extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
    this.state = {
      tabs: [
        {path: null,                name: "Sorting for the Median",       icon: "sort-amount-asc"},
        {path: "quiz",              name: "Quiz",                         icon: "pencil"}
      ], 
      list: generateList(8)
    }
  }

  changeList(list = []) {
    this.setState({list: list.length > 0 ? list : generateList()})
  }

  updateHighlightStepSelectionSort(step) {
    this.setState({highlightIndex: step + 2})
  }

  render() {
    let tabName = this.props.match.params.tab
    return (
      <div>
        <h1 className="title">Median</h1>
        <h2 className="subtitle">The middle number of a sorted list.</h2>

        <Tabs rootPath={"/median"} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        {tabName == "quiz" ? <MedianQuiz/> : (
          <div>
            {this.renderOverview()}
            {this.renderSelectionSort()}
            {this.renderMedianCalculation()}
            {this.renderQuizButton()}
          </div>
        )}
      </div>
    )
  }

  renderOverview() {
    return (
      <div className="content">
        <h3>What is the median?</h3>
        <h6>
          The median is another way to measure typical performance.
          The median sorts all the elements and takes the middle number as a typical number of the group.
        </h6>
        <h3>Why can't we just use the mean?</h3>
        <h6>
          The median is useful when the mean doesn't accurately describe the typical number in the group, <b>when one or a few numbers make the mean inaccurate</b>. 
          Such elements that are far from the mean are called <b>outliers</b>.
          For example, here are some examples where outliers make calculating the mean not very effective.
        </h6>
        <ul className="fa-ul">
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-money"></i>Bill Gates and a few normal friends want to figure out how much money they typically make.
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-dribbble"></i>Measure the typical height of 3 toddlers and Michael Jordan.
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-tint"></i>You're trying to find how much rain falls over 10 days, but on one day, there was a flood.
          </li>
        </ul>
        <h3>Definition of the Median</h3>
        <h6>
          Here are the steps needed to calculate the median of a list.
        </h6>
        <ol>
          <li style={{margin: 0}}>
            <strong>Sort the list.</strong> Sorting 
            can be done in many ways, and on this page we will cover <i>selection sort</i>, a
            simple method computers use to sort lists.
          </li>
          <li>
            Figure out if the list has an <b>odd or even number of elements</b>.
            <ul>
              <li>If it is odd, you can simply pull out the middle element of the list as the answer.</li>
              <li>If it is even, there are technically two middle elements. You must average these two elements.</li>
            </ul>
          </li>
          <li>You now have the median of a list!</li>
        </ol>

      </div>
    )
  }

  renderSelectionSort() {
    return (
      <div id="selection-sort" className="columns is-multiline is-desktop" style={{marginTop: "80px"}}>
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Selection Sort</h3>
            <h6>
              This animation shows a sorting method that finds a minimum value and 
              switches elements in the list to bring that number to the front of the list.
              Since we know that's the <strong>lowest element</strong>, 
              we can repeat the process on the rest of the list.
            </h6>
            <SelectionSortVisual list={this.state.list} 
              changeList={this.changeList.bind(this)} 
              updateHighlightStep={this.updateHighlightStepSelectionSort.bind(this)}  />
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"selection_sort.py"} highlightIndex={this.state.highlightIndex}
            showCode={this.props.showCode} setShowCode={this.props.setShowCode} />
        </div>
      </div>
    )
  }

  renderMedianCalculation() {
    let sortedList = this.state.list.slice().sort((a, b) => a > b)
    let isOddList = sortedList.length % 2 == 1
    let middleIndex = parseInt(sortedList.length / 2)
    let colorList = sortedList.map((element, index) => (
      ((index == middleIndex) || (!isOddList && (index == middleIndex - 1))) ? "light"
    : ""))

    return (
      <div className="columns is-multiline is-desktop" style={{marginTop: "80px"}}>
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Getting the Median From a Sorted List</h3>
            <ListRenderer list={sortedList} colorList={colorList}  />
            {isOddList ? 
            <div>
              <h6>The list is <b>odd</b>, so we can <i>simply pick out the middle element</i>.</h6>
              <div className="box">
                Median: <code>{sortedList[middleIndex]}</code>
              </div>
            </div> : 
            <div>
              <h6>The list is <b>even</b>, so we <i>average the two elements that share the middle</i>.</h6>
              <div className="box">
                Median: <code>({sortedList[middleIndex]} + {sortedList[middleIndex - 1]}) / 2</code> = <code>{(sortedList[middleIndex] + sortedList[middleIndex - 1]) / 2}</code>
              </div>
            </div>}
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"median.py"} 
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
        <Link to='/median/quiz' className="button is-primary is-large">Quiz The Median!</Link>
      </div>
    )
  }
}