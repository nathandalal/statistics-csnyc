import React from 'react'
import { Link } from 'react-router-dom'

import ListRenderer from '../list_renderer.jsx'
import { generateList } from '../../utils/generate_list'

export default class MedianQuiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionsNeededToPass: 2,
      questions: this.getTwoQuestions()
    }
  }

  getTwoQuestions() {
    return [
      {
        list: this.generateGoodMedianList(),
        max: 0,
        secondMin: 0,
        median: 0
      },
      {
        list: this.generateGoodMedianList(),
        max: 0,
        secondMin: 0,
        median: 0
      }
    ]
  }

  generateGoodMedianList() {
    return generateList(parseInt(6 + (Math.random() * 4), 10))
  }

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="content container has-text-centered animated fadeIn">
        <h3>This quiz will test your understanding of <b>sorting and the median</b>.</h3>
        <h6>You can always <Link to="/median">go back to the walkthrough</Link> if you need help.</h6>
        {this.state.questions.map((q, index) => (
          <div className="box container" style={{maxWidth: "800px"}} key={index} >
            <ListRenderer list={q.list} />
            <h6>
              <span className="icon is-small"><i className="fa fa-bell-o" aria-hidden="true"/></span> Remember
              to sort the 
              list. <span className="icon is-small"><i className="fa fa-bell-o" aria-hidden="true"/></span>
            </h6>
            {this.renderInput({
              label: "Maximum Element", icon: "arrow-up", 
              value: q.max, key: "max", questionIndex: index
            })}
            {this.renderInput({
              label: "2nd Smallest Element", icon: "level-down",
              value: q.secondMin, key: "secondMin", questionIndex: index
            })}
            {this.renderInput({
              label: "Median", icon: "balance-scale",
              value: q.median, key: "median", questionIndex: index
            })}
          </div>
        ))}
        {this.hasCompletedQuiz() ? (
          <div className="content container animated bounceInDown" style={{marginTop: "20px"}}>
            <h5>You're an expert on the median. Well done!</h5>
            <div className="block">
              <button className="button is-primary is-medium" 
                onClick={(() => this.setState({questions: this.state.questions.concat(this.getTwoQuestions())})).bind(this)}>
                More Median Practice
              </button>
              <span style={{padding: "2px"}} />
              <Link to="/mode" className="button is-success is-medium">To the Mode</Link>
            </div>
          </div>
          ) : ""}
      </div>
    )
  }

  renderInput(info) {
    return (
      <div className="field">
        <label className="label is-medium">{info.label}</label>
        <p className="control has-icons-left has-icons-right">
          <input className="input is-medium" type="number" step="0.001" value={info.value} disabled={this.isCorrectInput(info)}
            onChange={((event) => {
              let stateChange = Object.assign({}, this.state)
              stateChange["questions"][info.questionIndex][info.key] = parseFloat(event.target.value)
              this.setState(stateChange)
            }).bind(this)} />
          <span className="icon is-small is-left">
            <i className={`fa fa-${info.icon}`} />
          </span>
          <span className="icon is-small is-right">
            <i className="fa fa-check" style={{color: this.isCorrectInput(info) ? "#23d160" : ""}}/>
          </span>
        </p>
      </div>
    )
  }

  hasCompletedQuiz() {
    for(let i = 0; i < this.state.questionsNeededToPass; i++) {
      if(!(this.isCorrectInput({key: "max", questionIndex: i}))) return false
      if(!(this.isCorrectInput({key: "secondMin", questionIndex: i}))) return false
      if(!(this.isCorrectInput({key: "median", questionIndex: i}))) return false
    }
    return true
  }

  isCorrectInput(info) {
    let relevantState = this.state.questions[info.questionIndex]
    let sortedList = relevantState.list.slice().sort((a, b) => a > b)

    let isOddList = sortedList.length % 2 == 1
    let middleIndex = parseInt(sortedList.length / 2)
    let correctMedian = isOddList ? sortedList[middleIndex] : ((sortedList[middleIndex] + sortedList[middleIndex - 1]) / 2)

    if(info.key == "max") {
      return relevantState.max == sortedList[sortedList.length - 1]
    } else if (info.key == "secondMin") {
      return relevantState.secondMin == sortedList[1]
    } else { //info.key == "median"
      return Math.abs(relevantState.median - correctMedian) < 0.001
    }
  }
}