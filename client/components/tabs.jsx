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
        tab.class = activeTabFound ? "custom-inactive-tab" : "accessible-tab"
      } 
    })

    let renderLinkTab = (tab) => (
      <Link to={`${rootPath}${tab.path ? `/${tab.path}` : ""}`}>
        <span className="icon is-small">
          <i className="fa fa-check" style={{color: "#23d160"}}/>
        </span>
        <span>{tab.name}</span>
      </Link>
    )

    let renderNormalTab = (tab) => (
      <a style={{cursor: tab.class == "custom-inactive-tab" ? "not-allowed" : "default"}}>
        <span className="icon is-small">
          <i className={`fa fa-${tab.icon}`} />
        </span>
        <span>{tab.name}</span>
      </a>
    )

    return tabs.map(tab => (
      <li className={tab.class} key={tab.name}>
        {tab.class == "accessible-tab" ? renderLinkTab(tab) : renderNormalTab(tab)}
      </li>
    ))
  }

  return <div className="tabs is-boxed"><ul>{renderTabs()}</ul></div>
}

export default Tabs