import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.getCode()
    this.state = {showCode: document.cookie == "showCode=true" || false}
  }

  getCode() {
    axios.get(`/display_code/${this.props.fileName}`)
    .then(response => {
      let code = response.data
      code = hljs.highlight('python', code).value

      code = code.split('\n')

      if(this.props.highlightIndex && this.props.highlightIndex >= 0 && this.props.highlightIndex < code.length) {
        let highlightStyle = 'background-color: #989cb3; width: 100%; display: block;'
        code[this.props.highlightIndex] = `<span style="${highlightStyle}">` + code[this.props.highlightIndex] + "</span>"
      }

      code = code.join('\n')

      this.setState({rawCode: code})
    })
  }

  render() {
    return this.state && this.state.showCode ? this.renderCode() : this.renderHiddenCode()
  }

  renderCode() {
    return (this.state && this.state.rawCode) ? 
      <div>
        <div 
          style={{
            padding: "1em",
            backgroundColor: "#282a36",
            whiteSpace: "pre",
            fontFamily: "monospace",
            color: "#f8f8f2"
          }}
          dangerouslySetInnerHTML={{__html: this.state.rawCode}}>
        </div> 
        <a className="link is-pulled-right" onClick={this.showCodeAction.bind(this, false)}>Hide Code</a>
      </div> : <div>"Loading code..."</div>
  }

  renderHiddenCode() {
    return <div>
      <a className="button is-primary" onClick={this.showCodeAction.bind(this, true)}>Show Code</a>
    </div>
  }

  showCodeAction(flag) {
    document.cookie = `showCode=${flag}`
    this.setState({showCode: flag})
  }
}