import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import moment from 'moment'

import { Link } from 'react-router-dom'

export default class NBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team: "ATL",
      questions: [
        {
          mean: 0,
          median: 0,
          modes: [],
          modesString: ""
        },
        {
          mean: 0,
          median: 0,
          modes: [],
          modesString: ""
        }
      ],
      quizMode: true
    }
  }

  componentDidMount() { 
    this._isMounted = true
    this.setState({
      questions: [
        {
          mean: 0,
          median: 0,
          modes: [],
          modesString: ""
        },
        {
          mean: 0,
          median: 0,
          modes: [],
          modesString: ""
        }
      ]
    })
    if(!this.state.rosters) this.loadNBARoster()
  }

  loadNBARoster(waittime = 5000) {
    this.setState({rosterLoaded: false, rosters: []})
    axios.get(`/api/nba/roster${`?waittime=${waittime}`}`)
    .then(({data}) => {
      let get_mean = (arr) => (arr.reduce((a, b) => a + b )) / arr.length
      let get_median = (arr) => {
        arr.sort((a, b) => a - b)
        let half = Math.floor(arr.length / 2)
        return (arr.length % 2) ? arr[half] : ((arr[half - 1] + arr[half]) / 2.0)
      }
      let get_modes = (arr) => {
        let countMap = {}
        arr.forEach(num => countMap[num] = 0)
        arr.forEach(num => countMap[num] += 1)
        let maxCount = Math.max.apply(null, Object.values(countMap))
        return Object.keys(countMap).filter(key => countMap[key] == maxCount).map(key => parseInt(key, 10))
      }

      let rosters = {}
      data.playerentry.forEach(obj => {
        let abbr = obj.team && obj.team.Abbreviation ? obj.team.Abbreviation : "FAS"
        if(!rosters[abbr]) rosters[abbr] = {players: []}
        if(obj.player.Height && obj.player.Weight && obj.player.Age) rosters[abbr]["players"].push(obj.player)
      })

      Object.values(rosters).forEach(roster => {
        let ages = roster.players.map(player => parseInt(player.Age, 10))
        let weights = roster.players.map(player => parseInt(player.Weight, 10))
        let heights = roster.players.map(player => (parseInt(player.Height[0], 10) * 12) + parseInt(player.Height.replace('"').substr(2), 10))

        roster["typicalAge"] = {mean: get_mean(ages), median: get_median(ages), modes: get_modes(ages)}
        roster["typicalWeight"] = {mean: get_mean(weights), median: get_median(weights), modes: get_modes(weights)}
        roster["typicalHeight"] = {mean: get_mean(heights), median: get_median(heights), modes: get_modes(heights)}
      })

      if(this._isMounted) this.setState({
        rosterLoaded: moment(data.lastUpdatedOn, "YYYY-MM-DD hh:mm:ss A").subtract(10, 'seconds'),
        rosters: rosters
      })

    })
    .catch(e => e)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return this.state.rosterLoaded ? this.renderRosterVisualization() :
      <div className="container content has-text-centered">
        <h4>Loading NBA Rosters</h4>
        <p>
          <span className="icon is-large"><i className="fa fa-dribbble fa-spin"/></span>
        </p>
      </div>
  }

  renderRosterVisualization() {
    let currentRoster = this.state.rosters[this.state.team]
    let players = currentRoster.players.sort((a, b) => a.externalMapping ? a : b)

    return (
      <div className="container content">
        <Select
          name="team-name"
          value={this.state.team}
          options={this.getTeams()}
          onChange={(select => this.setState({team: select.value, quizMode: true})).bind(this)}
        />
        <h6 style={{marginBottom: "60px"}}><small>
          Rosters loaded from {this.state.rosterLoaded.from(moment())}. <a
            onClick={(() => this.loadNBARoster(20000)).bind(this)}>Force load the latest roster.</a>
        </small></h6>

        <div className="columns container content">
          {this.renderCard(Object.assign({}, currentRoster.typicalHeight), "Height")}
        </div>

        <h6 className="has-text-centered" style={{paddingBottom: "20px"}}>
          We{"'"}ve given you the mean, median, and mode heights for <b>
          {this.state.team == "BRO" ? "BKN" : (this.state.team == "OKL" ? "OKC" : this.state.team)}</b>.&nbsp;
          {this.state.quizMode ? "Now go find the typical age and weight!" : 
          "You decided to not do the work and just see the answers for age and weight, so here they are."}
        </h6>

        <div className="columns container content">
          {this.renderCard(Object.assign({}, currentRoster.typicalAge), "Age")}
          <div className="column is-2"></div>
          {this.renderCard(Object.assign({}, currentRoster.typicalWeight), "Weight (lbs)")}
        </div>

        <div className="container"><div className="columns is-multiline">
        {players.map(player => (
          <div className="card container column is-4-desktop is-6-tablet is-12-mobile" key={player.ID}
            style={{maxWidth: "260px", margin: "20px auto"}}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={player.externalMapping && player.externalMapping.ID ? 
                  `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.externalMapping.ID}.png` :
                  "/images/default_face.png"} alt="No Picture Available" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{player.FirstName} {player.LastName}</p>
                  <p className="subtitle is-6">{player.Position} #{player.JerseyNumber}</p>
                  <p className="subtitle is-6">{player.Height}, {player.Weight} lbs.<br/>Age {player.Age}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div></div>
        <div className="has-text-centered" style={{fontSize: this.state.quizMode ? "0.4em" : "1em"}}>
          <a onClick={(() => this.setState({quizMode: !this.state.quizMode})).bind(this)}>
            {this.state.quizMode ? "Show me the answers." : "Take me back to the quiz mode!"}
          </a>
        </div>
      </div>
    )
  }

  renderCard(data, title) {
    if (title == "Height" || !(this.state.quizMode)) {
      data["mean"] = `${(data["mean"] / 12).toFixed(2)}'`
      data["median"] = `${parseInt(data["median"] / 12, 10)}'${parseInt(data["median"] % 12, 10)}"`
      data["modes"] = data["modes"].map(datum => `${parseInt(datum / 12, 10)}'${parseInt(datum % 12, 10)}"`)

      return (
        <div className="box content container column is-4" style={{maxWidth: "260px", margin: "20px auto"}}>
          <h5 style={{clear:"both"}}>Average {title}</h5>
          <span>Mean<code className="pull-right">{data["mean"]}</code></span> 
          <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
          <span>Median<code className="pull-right">{data["median"]}</code></span> 
          <hr style={{marginTop: "5px", marginBottom: "5px"}}/>
          <span>Modes<code className="pull-right">{data["modes"].join(", ")}</code></span> 
        </div> 
      )
    }
    else {
      let renderInput = ((info) => (
        <div className="field">
          <label className="label">{info.label}</label>
          <p className="control has-icons-left has-icons-right">
            <input className={`input ${this.isCorrectInput(info) || info.value == 0 || !(info.value) ? "" : "is-danger"}`}
            type={info.key == "modes" ? "text" : "number"} 
              step="0.01" value={info.value} disabled={this.isCorrectInput(info)}
              onChange={((event) => {
                let stateChange = {questions: []}
                stateChange.questions = Object.assign({}, this.state.questions)

                if(info.key == "modes") {
                  stateChange["questions"][info.questionIndex].modesString = event.target.value
                  try {
                    let newModesList = event.target.value.split(",").map(str => parseInt(str.trim(), 10))
                    stateChange["questions"][info.questionIndex].modes = newModesList
                    this.setState(stateChange)
                  } catch (e) { throw e
                  } finally {
                    this.setState(stateChange)
                  }
                } else {
                  stateChange.questions[info.questionIndex][info.key] = parseFloat(event.target.value)
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
      )).bind(this)

      let index = title == "Age" ? 0 : 1

      return (
        <div className="box container column is-5" style={{maxWidth: "400px", height: "350px"}} >
          <h4>{title}</h4>
          <h6><small>
            If you need help on the <Link to="/mean">mean</Link>, <Link to="/mean">median</Link>,
            or <Link to="/mean">mode</Link>, we{"'"}re here for you.
          </small></h6>
          {renderInput({
            label: "Mean", icon: "list", 
            value: this.state.questions[index].mean, key: "mean", questionIndex: index
          })}
          {renderInput({
            label: "Median", icon: "balance-scale",
            value: this.state.questions[index].median, key: "median", questionIndex: index
          })}
          {renderInput({
            label: "Modes", icon: "group",
            value: this.state.questions[index].modesString, key: "modes", questionIndex: index
          })}
        </div>
      )
    }
  }

  isCorrectInput(info) {
    let dataObjKey = info.questionIndex == 0 ? "typicalAge" : "typicalWeight"

    if(info.key == "modes") {
      let areSameArray = (l1, l2) => l1.length==l2.length && l1.every((v,i)=> v === l2[i])
      return areSameArray(
        this.state.questions[info.questionIndex].modes.sort((a, b) => a > b), 
        this.state.rosters[this.state.team][dataObjKey].modes.sort((a, b) => a > b)
      )
    }

    return Math.abs(info.value - this.state.rosters[this.state.team][dataObjKey][info.key]) < 0.01
  }

  getTeams() {
    return [ 
      { value: 'ATL', label: 'Atlanta Hawks' },
      { value: 'BRO', label: 'Brooklyn Nets' },
      { value: 'BOS', label: 'Boston Celtics' },
      { value: 'CHA', label: 'Charlotte Hornets' },
      { value: 'CHI', label: 'Chicago Bulls' },
      { value: 'CLE', label: 'Cleveland Cavaliers' },
      { value: 'DAL', label: 'Dallas Mavericks' },
      { value: 'DEN', label: 'Denver Nuggets' },
      { value: 'DET', label: 'Detroit Pistons' },
      { value: 'GSW', label: 'Golden State Warriors' },
      { value: 'HOU', label: 'Houston Rockets' },
      { value: 'IND', label: 'Indiana Pacers' },
      { value: 'LAC', label: 'Los Angeles Clippers' },
      { value: 'LAL', label: 'Los Angeles Lakers' },
      { value: 'MEM', label: 'Memphis Grizzlies' },
      { value: 'MIA', label: 'Miami Heat' },
      { value: 'MIL', label: 'Milwaukee Bucks' },
      { value: 'MIN', label: 'Minnesota Timberwolves' },
      { value: 'NOP', label: 'New Orleans Pelicans' },
      { value: 'NYK', label: 'New York Knicks' },
      { value: 'OKL', label: 'Oklahoma City Thunder' },
      { value: 'ORL', label: 'Orlando Magic' },
      { value: 'PHI', label: 'Philadelphia 76ers' },
      { value: 'PHX', label: 'Phoenix Suns' },
      { value: 'POR', label: 'Portland Trail Blazers' },
      { value: 'SAC', label: 'Sacramento Kings' },
      { value: 'SAS', label: 'San Antonio Spurs' },
      { value: 'TOR', label: 'Toronto Raptors' },
      { value: 'UTA', label: 'Utah Jazz' },
      { value: 'WAS', label: 'Washington Wizards' },

      { value: 'FAS', label: 'Free Agents'}
    ]
  }
}