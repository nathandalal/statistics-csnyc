import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

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
    this.state = { showCode: cookie.load("showCode") == "true" || false }
    this.setShowCode = this.setShowCode.bind(this)
  }

  setShowCode(flag) {
    cookie.save("showCode", flag, {path: "/"})
    this.setState({showCode: flag})
  }

  render() {
    let main_routes = [
      { path: "/",           name: "Start",            icon: "play",              component: Home },
      { path: "/mean",       name: "Mean",             icon: "list",              component: Mean },
      { path: "/median",     name: "Median",           icon: "sort-amount-asc",   component: Median },
      { path: "/mode",       name: "Mode",             icon: "chevron-up",        component: Mode },
      { path: "/realdata",   name: "Using Live Data",  icon: "area-chart",        component: RealData }
    ]

    let all_routes = main_routes.concat([
      { path: "/mean/:tab",       component: Mean},
      { path: "/median/:tab",     component: Median},
      { path: "/mode/:tab",       component: Mode},
      { path: "/realdata/:tab",   component: RealData}
    ])

    let createElement = (Component, props) => <Component {...props} />

    return (
      <Router><div>
        <div style={{display: "flex", minHeight: "100vh", flexDirection: "column"}}>
          <div style={{flex: 1, padding: "5%"}}>
            {this.renderWarnIE()}
            {all_routes.map(route => <Route 
              exact path={route.path} 
              setShowCode={this.setShowCode}
              showCode={this.state.showCode}
              component={(props) => <route.component setShowCode={this.setShowCode} showCode={this.state.showCode} {...props} />} 
              key={route.path} />)}
          </div>
          <Footer routes={main_routes} />
        </div>
      </div></Router>
    )
  }

  renderWarnIE() {
    return (
      bowser.msie && bowser.version <= 8 ? 
      <div className="notification is-warning">
        You are using version Internet Explorer 8 or lower. Some animations in this exercise may not work.<br />
        Please <strong>switch browsers</strong> or update your Internet Explorer version. 
        Try <a target="_blank" href="http://google.com/chrome">Google Chrome</a>.
      </div> : ""
    )
  }
}

render(<Index />, document.getElementById('app'))