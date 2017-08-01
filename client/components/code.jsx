import React from 'react'
import axios from 'axios'

export default class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {screenWidth: window.innerWidth}
    this.getCode()
  }

  getCode() {
    axios.get(`/api/pylessonfiles/${this.props.fileName}`).then(({ data }) => {
      let code = window.hljs.highlight('python', data.src_str).value.split('\n')
      this.setState({code_lines: code.slice(0, -1), doc_lines: data.doc, code_raw: data.src})
    })
  }

  render() {
    return this.props.showCode ? this.renderCode() : this.renderHiddenCode()
  }

  updateDimensions() {
    this.setState({screenWidth: window.innerWidth})
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this))
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
            fontSize: this.state.screenWidth > 1192 ? "90%": "100%",
            color: "#f8f8f2",
            overflowX: "scroll"
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
                  backgroundColor: index == this.props.highlightIndex ? "#575975" :
                                  (index == this.state.focusIndex ? "#4c5067" : ""),
                  width: "100%",
                  display: "inline-block",
                  cursor: this.hasValidHighlightIndex() ? "default" : "pointer"
                }} />
              <br />
            </span>
          ))}
        </div> 
        <a className="link is-pulled-right" style={{marginLeft: "10%"}} onClick={(() => this.props.setShowCode(false)).bind(this)}>Hide Code</a>

        <div style={{clear: "all", padding: "1em", height: "220px"}} dangerouslySetInnerHTML={{__html: 
          this.hasValidHighlightIndex() ? this.state.doc_lines[this.props.highlightIndex] :
          (this.hasValidFocusIndex() ? this.state.doc_lines[this.state.focusIndex] : 
          "Hover over or click on any line of code to get a closer look.")}} />

      </div> : <div>Loading code, please wait...</div>
  }

  renderHiddenCode() {
    return <div className="content">
      <h5>Walk through the Python code that executes <code>{this.props.fileName}</code> step-by-step.</h5>
      <a className="button is-primary" onClick={(() => this.props.setShowCode(true)).bind(this)}>Show Code</a>
    </div>
  }

  focusOnCodeLine(index, shouldSet = true) {
    if (!(this.hasValidHighlightIndex())) {
      this.setState({focusIndex: shouldSet ? index : -1})
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