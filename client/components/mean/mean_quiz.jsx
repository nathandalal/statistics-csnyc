import React from 'react'
import { Link } from 'react-router-dom'

import ListRenderer from '../list_renderer.jsx'
import { generateList } from '../../utils/generate_list'

export default class MeanQuiz extends React.Component {
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
        list: this.generateGoodMeanList(),
        sum: 0,
        nElems: 0,
        mean: 0
      },
      {
        list: this.generateGoodMeanList(),
        sum: 0,
        nElems: 0,
        mean: 0
      }
    ]
  }

  generateGoodMeanList() {
    return generateList(parseInt(6 + (Math.random() * 4), 10))
  }

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="content container has-text-centered animated fadeIn">
        <h3>Compute the mean of the following lists!</h3>
        <h6>You can always <Link to="/mean">go back to the walkthrough</Link> if you need help.</h6>
        {this.state.questions.map((q, index) => (
          <div className="box container" style={{maxWidth: "800px"}} key={index} >
            <ListRenderer list={q.list} />
            {this.renderInput({
              label: "Sum", icon: "list", 
              value: q.sum, key: "sum", questionIndex: index
            })}
            {this.renderInput({
              label: "Number of Elements", icon: "group",
              value: q.nElems, key: "nElems", questionIndex: index
            })}
            {this.renderInput({
              label: "Mean", icon: "balance-scale",
              value: q.mean, key: "mean", questionIndex: index
            })}
          </div>
        ))}
        {this.hasCompletedQuiz() ? (
          <div className="content container animated bounceInDown" style={{marginTop: "20px"}}>
            <h5>You're an expert on the mean. Well done!</h5>
            <div className="block">
              <button className="button is-primary is-medium" 
                onClick={(() => this.setState({questions: this.state.questions.concat(this.getTwoQuestions())})).bind(this)}>
                More Mean Practice
              </button>
              <span style={{padding: "2px"}} />
              <Link to="/median" className="button is-success is-medium">To the Median</Link>
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
      if(!(this.isCorrectInput({key: "sum", questionIndex: i}))) return false
      if(!(this.isCorrectInput({key: "nElems", questionIndex: i}))) return false
      if(!(this.isCorrectInput({key: "mean", questionIndex: i}))) return false
    }
    return true
  }

  isCorrectInput(info) {
    let relevantState = this.state.questions[info.questionIndex]

    let correctSum = relevantState.list.reduce((a, b) => a + b, 0)
    let correctNElems = relevantState.list.length

    if(info.key == "sum") {
      return relevantState.sum == correctSum
    } else if (info.key == "nElems") {
      return relevantState.nElems == correctNElems
    } else { //info.key == "mean"
      return Math.abs(relevantState.mean - (correctSum * 1.0 / correctNElems)) < 0.001
    }
  }
}