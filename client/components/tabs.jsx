import React from 'react'
import { Link } from 'react-router-dom'

const Tabs = ({ tabs }) => (
  <div className="tabs is-boxed"><ul>
    {tabs.map(tab => (
      <li className={tab.active ? "is-active" : "custom-inactive-tab"} key={tab.name}>
        <a style={{cursor: "default"}}>
          <span className="icon is-small"><i className={`fa fa-${tab.icon}`}></i></span>
          <span>{tab.name}</span>
        </a>
      </li>
    ))}
  </ul></div>
)

export default Tabs