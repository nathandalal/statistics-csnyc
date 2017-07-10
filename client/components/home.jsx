import React from 'react';
import {render} from 'react-dom';
import Code from './code.jsx'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">Mean, Median, and Mode</h1>
        <h2 className="subtitle">Get started with understanding data.</h2>

        <div className="tabs is-boxed">
          <ul>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-image"></i></span>
                <span>Overview</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-hourglass-start"></i></span>
                <span>bruh</span>
              </a>
            </li>
            <li className="is-active">
              <a>
                <span className="icon is-small"><i className="fa fa-list"></i></span>
                <span>bruh</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-file-text-o"></i></span>
                <span>bruh</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="columns is-desktop is-gapless">
          <div className="column is-two-thirds">
            Nothing to currently see here.
          </div>
          <div className="column is-one-thirds">
            <Code 
              fileName={"mean.py"} highlightIndex={3} />
          </div>
        </div>
      </div>
    )
  }
}