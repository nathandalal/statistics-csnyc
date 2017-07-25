import React from 'react';
import Code from './code.jsx'
import Tabs from './tabs.jsx'
import { Link } from 'react-router-dom'

import NBA from './realdata/nba.jsx'
import Weather from './realdata/weather.jsx'

export default class RealData extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {path: null,        name: "How Do Computers Talk?",           icon: "table"},
        {path: "weather",   name: "Playground: Weather Forecast",     icon: "sun-o"},
        {path: "nba",       name: "Playground: NBA Rosters",          icon: "dribbble"}
      ]
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    let tabName = this.props.match.params.tab
    let sampleAPICode = '{\
\n  <span class="hljs-attr">"timestamp"</span>: <span class="hljs-number">1500921049</span>,\
\n  <span class="hljs-attr">"iss_position"</span>: {\
\n    <span class="hljs-attr">"longitude"</span>: <span class="hljs-string">"-50.7373"</span>,\
\n    <span class="hljs-attr">"latitude"</span>: <span class="hljs-string">"-39.8239"</span>,\
\n  },\
\n  <span class="hljs-attr">"message"</span>: <span class="hljs-string">"success"</span>\
\n}'
    return (
      <div>
        <h1 className="title">APIs for Live Data</h1>
        <h2 className="subtitle">Putting all the knowledge together!</h2>

        <Tabs rootPath="/realdata" tabs={this.state.tabs} activeTab={tabName} />

        {tabName == "weather" ? <Weather /> : (
          tabName == "nba" ? <NBA /> : (
            <div className="content">

              <h3>What is an API?</h3>
              <p>
                An application programming interface, or an API, is a fancy way to talk about how computers communicate.
                Computers send and receive information in structured ways, and we'll learn in this unit how that is done.
              </p>
              <h3>Why do we care?</h3>
              <p>
                This is finally a chance to get hands on some <b>real data</b>.
                All the techniques of mean, median, and mode, as well as other ways to analyze numbers that you will learn,
                will come together when you practice your skills on real data.
              </p>
              <h3>Trying out an API</h3>
              <p>
                We will learn JavaScript Object Notation, or JSON, which is a way in which computers structure data.
                There are many sources of data that provide an API for us to read their data.
                Try clicking on the link to open an example of JSON data in your browser.
              </p>
              <h6>Show the current position of the ISS space station by clicking the link below.</h6>
              <pre>
                <a target="_blank" href="http://api.open-notify.org/iss-now.json">http://api.open-notify.org/iss-now.json</a>
              </pre>

              <h3>The JSON Object Format</h3>
              <h6>Here's a sample response from clicking the link.</h6>
              <pre><code className="hljs json" dangerouslySetInnerHTML={{__html: sampleAPICode}}>
              </code></pre>

              <p>
                Let's say you had a variable called <code>data</code> that stored this information.
                With JSON, if you wanted to get the <code>timestamp</code> part of the <code>data</code>,
                you would simply write <code>data.timestamp</code>. Timestamps are actually stored as numbers like shown above 
                (find out what date and time that number is from <a target="_blank" href="https://www.epochconverter.com/">using this link</a>).
              </p>
              <p>
                This continues for the latitude, as you would access
                that by writing <code>data.iss_position.latitude</code>.
                You'll see an example of showing a map based on the location of a place on the next page.
              </p>
              <p>
                If you want to know more about JSON, you can <a href="http://www.json.org/">click on this link</a>.
              </p>

              <h3>Playing With Real Data!</h3>
              <p>
                Now that you have a sense for how the JSON object works and how computers communicate, let's use a few APIs
                to get real data. We'll use our new mean, median, and mode skills for analysis.
              </p>
              <div className="block">
                <Link to="/realdata/weather" className="button is-primary is-medium">Weather Activity</Link>
                <span style={{padding: "2px"}} />
                <Link to="/realdata/nba" className="button is-warning is-medium">NBA Activity</Link>
              </div>
            </div>
        ))}

      </div>
    )
  }
}