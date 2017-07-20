import React from 'react'
import Select from 'react-select'
import axios from 'axios'

export default class NBA extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team: "okc"
    }
  }

  componentDidMount() {

  }

  render() {
    let teams = [ 
      { value: 'ATL', label: 'Atlanta Hawks' },
      { value: 'BKN', label: 'Brooklyn Nets' },
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
      { value: 'OKC', label: 'Oklahoma City Thunder' },
      { value: 'ORL', label: 'Orlando Magic' },
      { value: 'PHI', label: 'Philadelphia 76ers' },
      { value: 'PHX', label: 'Phoenix Suns' },
      { value: 'POR', label: 'Portland Trail Blazers' },
      { value: 'SAC', label: 'Sacramento Kings' },
      { value: 'SAS', label: 'San Antonio Spurs' },
      { value: 'TOR', label: 'Toronto Raptors' },
      { value: 'UTA', label: 'Utah Jazz' },
      { value: 'WAS', label: 'Washington Wizards' }
    ]

    return (
      <div>
        <Select
          name="team-name"
          value={this.state.team}
          options={teams}
          onChange={((value, label) => this.setState({team: value})).bind(this)}
        />
      </div>
    )
  }
}