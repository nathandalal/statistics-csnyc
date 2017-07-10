import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './components/home.jsx'
import Mean from './components/mean.jsx'
import Median from './components/median.jsx'
import Mode from './components/mode.jsx'
import RealData from './components/realdata.jsx'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let routes = [
      { path: "/",           name: "Start",            icon: "play",              component: Home},
      { path: "/mean",       name: "Mean",             icon: "list",              component: Mean },
      { path: "/median",     name: "Median",           icon: "sort-amount-asc",   component: Median },
      { path: "/mode",       name: "Mode",             icon: "chevron-up",        component: Mode },
      { path: "/realdata",   name: "Using Live Data",  icon: "area-chart",        component: RealData }
    ]

    return (
      <Router>
        <div>
          {routes.map(route => <Route exact path={route.path} component={route.component} key={route.name} />)}
          <div className="bottom-footer tabs is-centered"><ul>
            {routes.map(route => (
              <li key={route.name}>
                <Link to={route.path}>
                  <span className="icon is-small"><i className={`fa fa-${route.icon}`}></i></span>
                  <span>{route.name}</span>
                </Link>
              </li>
            ))}
          </ul></div>
        </div>
      </Router>
    )
  }
}

render(<Index />, document.getElementById('app'))