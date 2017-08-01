import React from 'react'
import { Link } from 'react-router-dom'

import ListRenderer from '../list_renderer.jsx'
import { generateList } from '../../utils/generate_list'

export default class ModeQuiz extends React.Component {
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
        list: this.generateGoodModeList(),
        modes: [0],
        modesString: "0"
      },
      {
        list: this.generateGoodModeList(),
        modes: [0],
        modesString: "0"
      }
    ]
  }

  generateGoodModeList() {
    return generateList(parseInt(8 + (Math.random() * 2), 10), 1, 10)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="content container has-text-centered animated fadeIn">
        <h3>This quiz will test your understanding of <b>counting and the mode</b>.</h3>
        <h6>You can always <Link to="/mode">go back to the walkthrough</Link> if you need help.</h6>
        {this.state.questions.map((q, index) => (
          <div className="box container" style={{maxWidth: "800px"}} key={index} >
            <ListRenderer list={q.list} />
            <h6>
              <span className="icon is-small"><i className="fa fa-bell-o" aria-hidden="true"/></span> There
              may be more than one mode. Please separate all correct answers with commas. <span 
              className="icon is-small"><i className="fa fa-bell-o" aria-hidden="true"/></span>
              <br/>
              Example: 1, 2, 3
            </h6>
            {this.renderInput({
              label: "All Modes", icon: "cubes", questionIndex: index
            })}
          </div>
        ))}
        {this.hasCompletedQuiz() ? (
          <div className="content container animated bounceInDown" style={{marginTop: "20px"}}>
            <h5>You{"'"}re an expert on the mode. Well done!</h5>
            <div className="block">
              <button className="button is-primary is-medium" 
                onClick={(() => this.setState({questions: this.state.questions.concat(this.getTwoQuestions())})).bind(this)}>
                More Mode Practice
              </button>
              <span style={{padding: "2px"}} />
              <Link to="/realdata" className="button is-success is-medium">Use Real Data!</Link>
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
          <input className={`input is-medium 
            ${this.isCorrectInput(info) || info.value == 0 || !(info.value) ? "" : "is-danger"}`}
            type="text" value={info.value} disabled={this.isCorrectInput(info)}
            onChange={((event) => {
              let stateChange = Object.assign({}, this.state)
              stateChange["questions"][info.questionIndex].modesString = event.target.value
              try {
                let newModesList = event.target.value.split(",").map(str => parseInt(str.trim(), 10))
                stateChange["questions"][info.questionIndex].modes = newModesList
                this.setState(stateChange)
              } catch (e) { throw(e)
              } finally {
                this.setState(stateChange)
              }

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
      if(!(this.isCorrectInput({questionIndex: i}))) return false
    }
    return true
  }

  isCorrectInput(info) {
    let relevantState = this.state.questions[info.questionIndex]
    let countMap = {}
    relevantState.list.forEach(num => (countMap[num] = 0))
    relevantState.list.forEach(num => (countMap[num] += 1))
    let maxCount = Math.max.apply(null, Object.values(countMap))
    let correctModes = Object.keys(countMap).filter(key => countMap[key] == maxCount).map(key => parseInt(key, 10))

    let areSameArray = (l1, l2) => l1.length==l2.length && l1.every((v,i)=> v === l2[i])
    return areSameArray(correctModes.sort((a, b) => a > b), relevantState.modes.sort((a, b) => a > b))   
  }
}