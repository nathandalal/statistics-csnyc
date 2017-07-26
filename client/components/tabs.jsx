import React from 'react'
import { Link } from 'react-router-dom'

const Tabs = ({ rootPath, tabs, activeTab }) => {
  let renderTabs = () => {
    let activeTabFound = false
    tabs.forEach(tab => {
      if (activeTab == tab.path) {
        tab.class = "is-active"
        activeTabFound = true
      } else {
        tab.class = activeTabFound ? "later-tab" : "accessible-tab"
      } 
    })

    let renderFinishedTab = (tab) => (
      <Link to={rootPath ? `${rootPath}${tab.path ? `/${tab.path}` : ""}` : ""}>
        <span className="icon is-small">
          <i className="fa fa-check" style={{color: "#23d160"}}/>
        </span>
        <span>{tab.name}</span>
      </Link>
    )

    let renderNormalTab = (tab) => (
      <Link to={rootPath ? `${rootPath}${tab.path ? `/${tab.path}` : ""}` : ""}>
        <span className="icon is-small">
          <i className={`fa fa-${tab.icon}`} />
        </span>
        <span>{tab.name}</span>
      </Link>
    )

    return tabs.map(tab => (
      <li className={tab.class} key={tab.name}>
        {tab.class == "accessible-tab" ? renderFinishedTab(tab) : renderNormalTab(tab)}
      </li>
    ))
  }

  return <div className="tabs is-boxed"><ul>{renderTabs()}</ul></div>
}

export default Tabs