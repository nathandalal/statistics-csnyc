import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './components/home.jsx'
import Mean from './components/mean.jsx'
import Median from './components/median.jsx'
import Mode from './components/mode.jsx'
import RealData from './components/realdata.jsx'

import Footer from './components/footer.jsx'

import bowser from 'bowser'

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
          {bowser.msie && bowser.version <= 8 ? 
          <div className="notification is-warning">
            You are using version Internet Explorer 8 or lower. Some animations in this exercise may not work.<br />
            Please <strong>switch browsers</strong> or update your Internet Explorer version. Try <a target="_blank" href="http://google.com/chrome">Google Chrome</a>.
          </div> : ""}
          {routes.map(route => <Route exact path={route.path} component={route.component} key={route.name} />)}
          <Footer routes={routes} />
        </div>
      </Router>
    )
  }
}

render(<Index />, document.getElementById('app'))