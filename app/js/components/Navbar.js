import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import BackButton from '../components/BackButton'
import ForwardButton from '../components/ForwardButton'
import AddressBar from './AddressBar'

class Navbar extends Component {
  static propTypes = {
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-faded navbar-fixed-top">
        <div className="nav navbar-nav">
          <div className="pull-xs-left back-forth">
            <div className="nav-item nav-link">
              <BackButton>
                <img src="/images/icon-previous.svg"/>
              </BackButton>
            </div>
            <div className="nav-item nav-link">
              <ForwardButton>
                <img src="/images/icon-next.svg" />
              </ForwardButton>
            </div>
          </div>
          <div className="pull-xs-right browser-links">
            <div className="nav-item nav-link">
              <Link to="/">
                <div className="icon-labels">
                  <img className="bar-icon-home" src="/images/icon-home.svg"/>
                  <span className="icon-label-wrap">Home</span>
                </div>
              </Link>
            </div>
            <div className="nav-item nav-link">
              <Link to="/account/settings">
                <div className="icon-labels">
                  <img src="/images/icon-cog.svg"/>
                  <span className="icon-label-wrap">Account</span>
                </div>
              </Link>
            </div>
            
          </div>
          <div className="nav-search">
            <div className="nav-link">
              <AddressBar placeholder="Search for people, apps & more…" />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar