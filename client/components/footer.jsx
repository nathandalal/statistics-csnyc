import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ routes }) => (
  <footer><div className="tabs is-centered"><ul style={{marginBottom: "10px"}}>
    {routes.map(route => (
      <li key={route.name} className={`${window.location.pathname == route.path ? "is-active" : ""}`}>
        <Link to={route.path}>
          <span className="icon is-small"><i className={`fa fa-${route.icon}`}></i></span>
          <span>{route.name}</span>
        </Link>
      </li>
    ))}
  </ul></div></footer>
)

export default Footer