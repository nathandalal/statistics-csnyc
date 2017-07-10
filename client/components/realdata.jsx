import React from 'react';
import {render} from 'react-dom';
import Code from './code.jsx'

export default class RealData extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">APIs for Live Data</h1>
        <h2 className="subtitle">Putting all the knowledge together!</h2>

        <div className="tabs is-boxed">
          <ul>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-image"></i></span>
                <span>What is an API?</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-table"></i></span>
                <span>How to Read Data</span>
              </a>
            </li>
            <li className="is-active">
              <a>
                <span className="icon is-small"><i className="fa fa-sun-o"></i></span>
                <span>Playground: Weather</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-dribbble"></i></span>
                <span>Playground: NBA Stats</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="columns is-desktop is-gapless">
          <div className="column is-two-thirds">
            Nothing to currently see here.
          </div>
          <div className="column is-one-thirds">
            No code currently available.
          </div>
        </div>
      </div>
    )
  }
}