import React from 'react';
import axios from 'axios';

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showCode: document.cookie == "showCode=true" || false}
    this.getCode()
  }

  getCode() {
    axios.get(`/api/pylessonfiles/${this.props.fileName}`).then(({ data }) => {
      let code = hljs.highlight('python', data.src_str).value.split('\n')
      this.setState({code_lines: code, doc_lines: data.doc, code_raw: data.src})
    })
  }

  render() {
    return this.state && this.state.showCode ? this.renderCode() : this.renderHiddenCode()
  }

  renderCode() {
    return (this.state && this.state.code_lines) ? 
      <div>
        <div 
          style={{
            padding: "1em",
            backgroundColor: "#282a36",
            whiteSpace: "pre",
            fontFamily: "monospace",
            color: "#f8f8f2"
          }}>
          {this.state.code_lines.map((line, index) => (
            <span key={index}>
              <span
                className={`custom-code-line line-${index}`}
                onClick={this.focusOnCodeLine.bind(this, index)}
                onMouseEnter={this.focusOnCodeLine.bind(this, index)}
                onMouseLeave={this.focusOnCodeLine.bind(this, index, false)}
                dangerouslySetInnerHTML={{__html: line}}
                style={{
                  backgroundColor: index == this.props.highlightIndex ? "#989cb3" :
                                  (index == this.state.focusIndex ? "#4c5067" : ""),
                  width: "100%",
                  display: "inline-block"
                }} />
              <br />
            </span>
          ))}
        </div> 
        <a className="link is-pulled-right" style={{marginLeft: "10%"}} onClick={this.showCodeAction.bind(this, false)}>Hide Code</a>

        <div style={{clear: "all", padding: "1em"}} dangerouslySetInnerHTML={{__html: 
          this.hasValidHighlightIndex() ? this.state.doc_lines[this.props.highlightIndex] :
          (this.hasValidFocusIndex() ? this.state.doc_lines[this.state.focusIndex] : 
          "Hover over or click on any line of code to get a closer look.")}} />

      </div> : <div>Loading code, please wait...</div>
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

  focusOnCodeLine(index, shouldSet = true) {
    console.log(index, this.hasValidHighlightIndex(), this.hasValidFocusIndex())
    if (!(this.hasValidHighlightIndex())) {
      this.setState({focusIndex: shouldSet ? index : null})
    }
  }

  hasValidHighlightIndex() {
    return (this.props.highlightIndex == 0) ||
        this.props.highlightIndex >= 0 && 
        this.props.highlightIndex < this.state.code_lines.length
  }

  hasValidFocusIndex() {
    return (this.state.focusIndex == 0) ||
        this.state.focusIndex >= 0 && 
        this.state.focusIndex < this.state.code_lines.length
  }
}