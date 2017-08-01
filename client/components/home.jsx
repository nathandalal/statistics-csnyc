import React from 'react';
import { Link } from 'react-router-dom'
import Code from './code.jsx'
import Tabs from './tabs.jsx'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.initTabs()
  }

  initTabs() {
    this.state = {
      tabs: [
        {name: "Getting Started",   icon: "play-circle"},
      ]
    }
    console.log(this.props)
  }

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <h1 className="title">Mean, Median, and Mode</h1>
        <h2 className="subtitle">Get started with understanding the <i>typical</i> element in a list.</h2>

        <Tabs tabs={this.state.tabs} />

        {this.renderIntro()}
        {this.renderGetStarted()}
      </div>
    )
  }

  renderIntro() {
    return (
      <div className="content">
        <h3>Understanding Lists</h3>
        <p>
          A list of numbers has many elements. 
          The data in lists are not easy to understand just by looking at them.
          We need some ways to get simpler information about all the elements in the list.
        </p>
        <h3>Why Mean, Median, Mode?</h3>
        <p>
          Mean, median, and mode are <b>metrics</b> used to describe the <i>typical</i> element in a list.
          By using these three properties, we can gain insights into 
          what an average number would look like in a list.
        </p>
        <h3>Data is Everywhere!</h3>
        <p>
          You measure typical performance all the time, and so do computers. Here are some cool examples!
        </p>
        <ul className="fa-ul">
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-dribbble fa-spin"></i>Measure the average performance of your favorite player!
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-sun-o"></i>Track how the weather is the last few weeks in any city in the world!
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-medkit"></i>Figure out how long it usually takes to get rid of a cold.
          </li>
          <li style={{listStyleType: "none"}}>
            <i className="fa-li fa fa-music"></i>See how much your favorite artist makes on an average concert!
          </li>
        </ul>
        <h3>Your Goals</h3>
        <p>
          By the end of this unit, you should be able to calculate a mean, median, and mode of any list, and 
          get an idea for a strategy on how computers calculate these metrics. You will also learn how computers
          communicate and share data!
        </p>

      </div>
    )
  }

  renderGetStarted() {
    return (
      <div className="content animated fadeIn" style={{
        animationDuration: "3s",
        animationDelay: ""
      }}>
        <h4 className="title is-4">What are you waiting for?</h4>
        <h6 className="subtitle is-6">Click the button and jump in!</h6>
        <Link to="/mean" className="button is-primary is-large">Get Started</Link>
      </div>
    )
  }
}