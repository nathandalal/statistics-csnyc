import React from 'react';
import {render} from 'react-dom';
import Code from './code.jsx'

export default class Mean extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title">Mean</h1>
        <h2 className="subtitle">The average of all elements in a list.</h2>

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
                <span>Initialize Variables</span>
              </a>
            </li>
            <li className="is-active">
              <a>
                <span className="icon is-small"><i className="fa fa-list"></i></span>
                <span>Loop Over a List</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small"><i className="fa fa-file-text-o"></i></span>
                <span>Compute Average</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="columns is-desktop is-gapless">
          <div className="column is-two-thirds">
          </div>
          <div className="column is-one-thirds">
            <Code 
              fileName={"mean.py"} highlightIndex={6}
              showCode={this.props.showCode} 
              showCodeAction={this.props.showCodeAction}
              hideCodeAction={this.props.hideCodeAction} />
          </div>
        </div>
      </div>
    )
  }
}