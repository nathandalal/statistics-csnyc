import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ routes }) => (
  <footer>
    <div className="tabs is-centered" style={{marginBottom: "1px"}}><ul>
    {routes.map(route => (
      <li key={route.name} className={
        `${window.location.pathname == "/" && route.path == "/" || 
          (route.path !== "/" && window.location.pathname.substring(0, route.path.length) === route.path) ?
          "is-active" : ""
      }`}>
        <Link to={route.path}>
          <span className="icon is-small"><i className={`fa fa-${route.icon}`}></i></span>
          <span>{route.name}</span>
        </Link>
      </li>
    ))}
    </ul></div>
    <div style={{marginBottom: "10px"}} className="has-text-centered">
      <small>Made at <i className="fa fa-envira" style={{marginTop: "8px", fontSize: "10px"}}></i>MongoDB</small>
    </div>
  </footer>
)

export default Footer