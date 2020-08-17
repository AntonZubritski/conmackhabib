import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './lineFeed.css'

class LineFeed extends Component {
  feedClassName = (name) => {
    const { params } = this.props
    return params.feed === name ? 'nav-link active' : 'nav-link'
  }
  checkTokenYourfeed = () => {
    const { DelArticles, token } = this.props
    if (token === true) {
      DelArticles()
    } else if (!token) {
      return null
    }
  }
  checkTokenNavlink = feed =>  this.props.token ? "/home/yourfeed/1" : `/home/${this.props.params.feed}/1`

  render() {
    const { userName, feed} = this.props.params
    
    const tagFragment = (
      <li className="nav-item">
        <input
          type="button"
          className={this.feedClassName(feed)}
          name={feed}
          value={`#${feed}`}
        />
      </li>
    )

    const arrFeed = ['globalfeed', 'yourfeed', 'mypost', 'favor']

    const innerTag = () => {
      const tag = arrFeed.indexOf(feed) > -1
      return !tag ? tagFragment : null
    }

    const yourfeed = (
      <li className="nav-item">
      <NavLink to="/home/yourfeed/1">
        <input
          type="button"
          className={this.feedClassName('yourfeed')}
          value="Your Feed"
        />
      </NavLink>
    </li>
    )
    const homeFeed = (
      <>
      {this.props.token ? yourfeed : null}
        <li className="nav-item">
          <NavLink to="/home/globalfeed/1">
            <input
              type="button"
              className={this.feedClassName('globalfeed')}
              value="Global Feed"
            />
          </NavLink>
        </li>
      </>
    )

    const profileFeed = (
      <>
        <li className="nav-item">
        <NavLink to={`/profile/${userName}/mypost/1`}>
          <input
            type="button"
            className={this.feedClassName('mypost')}
            value="My Post"
          />
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to={`/profile/${userName}/favor/1`}>
          <input
            type="button"
            className={this.feedClassName('favor')}
            value="Favorited Post"
          />
          </NavLink>
        </li>
      </>
    )

    const homeOrProfileFeed =
      feed === 'mypost' || feed === 'favor'
        ? profileFeed
        : homeFeed

    return (
      <ul className="nav nav-pills">
        {homeOrProfileFeed}
        {innerTag()}
      </ul>
      )
  }
}

export default LineFeed
