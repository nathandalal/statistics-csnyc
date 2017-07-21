import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import moment from 'moment'

export default class NBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team: "ATL"
    }
  }

  componentDidMount() { this.loadNBARoster() }

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
        let heights = roster.players.map(player => (parseInt(player.Height[0], 10) * 12) + parseInt(player.Height.replace('\"').substr(2), 10))

        roster["typicalAge"] = {mean: get_mean(ages), median: get_median(ages), modes: get_modes(ages)}
        roster["typicalWeight"] = {mean: get_mean(weights), median: get_median(weights), modes: get_modes(weights)}
        roster["typicalHeight"] = {mean: get_mean(heights), median: get_median(heights), modes: get_modes(heights)}
      })

      this.setState({
        rosterLoaded: moment(data.lastUpdatedOn, "YYYY-MM-DD hh:mm:ss A").subtract(5, 'seconds'),
        rosters: rosters
      })

    })
    .catch(e => console.error(e))
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
    console.log(currentRoster)

    return (
      <div className="container content">
        <Select
          name="team-name"
          value={this.state.team}
          options={this.getTeams()}
          onChange={(select => this.setState({team: select.value})).bind(this)}
        />
        <h6 style={{marginBottom: "60px"}}><small>
          Rosters loaded from {this.state.rosterLoaded.from(moment())}. <a
            onClick={(() => this.loadNBARoster(20000)).bind(this)}>Force load the latest roster.</a>
        </small></h6>

        <div className="columns container content">
          {this.renderCard(currentRoster.typicalAge, "Age")}
          {this.renderCard(currentRoster.typicalHeight, "Height")}
          {this.renderCard(currentRoster.typicalWeight, "Weight (lbs)")}
        </div>

        <div className="container"><div className="columns is-multiline">
        {players.map(player => (
          <div className="card container column is-4-desktop is-6-tablet is-12-mobile" key={player.ID}
            style={{maxWidth: "260px", margin: "20px auto"}}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={player.externalMapping && player.externalMapping.ID ?
                  `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.externalMapping.ID}.png` : "/images/default_face.png"} alt="No Picture Available" />
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
      </div>
    )
  }

  renderCard(data, title) {
    if (title == "Height") {
      data["mean"] = `${(data["mean"] / 12).toFixed(2)}\'`
      data["median"] = `${parseInt(data["median"] / 12, 10)}\'${parseInt(data["median"] % 12, 10)}\"`
      data["modes"] = data["modes"].map(datum => `${parseInt(datum / 12, 10)}\'${parseInt(datum % 12, 10)}\"`)
    } else data["mean"] = data["mean"].toFixed(2)

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