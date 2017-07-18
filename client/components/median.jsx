import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import SelectionSortVisual from './median/selection_sort_visual.jsx'
import { generateList } from '../utils/generate_list'

export default class Median extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,                name: "What is the Median?",          icon: "image"},
        {path: "sorting",           name: "Sorting Algorithms",           icon: "sort-amount-asc"},
        {path: "quiz",              name: "Quiz",                         icon: "pencil"}
      ], 
      list: generateList()
    }
  }

  changeList(list = []) {
    this.setState({list: list.length > 0 ? list : generateList()})
  }

  updateHighlightStepSelectionSort(step) {
    this.setState({ssHighlightIndex: step + 2})
  }

  render() {
    let tabName = this.props.match.params.tab
    return (
      <div>
        <h1 className="title">Median</h1>
        <h2 className="subtitle">The middle element of a sorted list.</h2>

        <Tabs rootPath={"/median"} tabs={this.state.tabs} activeTab={this.props.match.params.tab} />

        {tabName == "quiz" ? <MeanQuiz/> : 
        (tabName == "sorting" ? (
          <div>
            {this.renderSelectionSort()}
            {this.renderMergeSort()}
            {this.renderEfficiencyTalk()}
            {this.renderMedianCalculation()}
          </div>
        ) : this.renderOverview())}
      </div>
    )
  }

  renderOverview() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>What is the median?</h3>
            <h6>The median is another way to measure average performance.</h6>
            <Link to="/median/sorting" className="button is-primary">Explore Sorting</Link>
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"median.py"} />
        </div>
      </div>
    )
  }

  renderSelectionSort() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Selection Sort</h3>
            <h6>This animation shows a sorting method that finds a minimum value and puts it in the front.</h6>
            <SelectionSortVisual list={this.state.list} 
              changeList={this.changeList.bind(this)} 
              updateHighlightStep={this.updateHighlightStepSelectionSort.bind(this)}  />
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"selection_sort.py"} highlightIndex={this.state.ssHighlightIndex} />
        </div>
      </div>
    )
  }

  renderMergeSort() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Merge Sort</h3>
            <h6>The median is another way to measure average performance.</h6>
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"merge_sort.py"} />
        </div>
      </div>
    )
  }

  renderEfficiencyTalk() {
    return (
      <div className="content">
        <h3>Tradeoffs (in-place vs speed)</h3>
        <h6>The median is another way to measure average performance.</h6>
      </div>
    )
  }

  renderMedianCalculation() {
    return (
      <div className="columns is-multiline is-desktop">
        <div className="column is-7-widescreen is-12-desktop">
          <div className="content">
            <h3>Getting the Median</h3>
            <h6>The median is another way to measure average performance.</h6>
          </div>
        </div>
        <div className="column is-5-widescreen is-12-desktop">
          <Code fileName={"median.py"} />
        </div>
      </div>
    )
  }
}