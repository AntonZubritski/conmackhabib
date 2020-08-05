import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import './lineFeed.css'

class LineFeed extends Component {
  feedClassName = (name) => {
    const { params } = this.props
    return params.feed === name ? 'nav-link active' : 'nav-link'
  }

  render() {
    const { articlesApi, params, UpdateArticlesApi, DelArticles } = this.props

    const tagFragment = (
      <li className="nav-item">
        <input
          type="button"
          className={this.feedClassName(articlesApi)}
          name={articlesApi}
          value={`#${articlesApi}`}
        />
      </li>
    )

    const innerTag =
      articlesApi === 'globalfeed' ||
      articlesApi === 'yourfeed' ||
      articlesApi === 'mypost' ||
      articlesApi === 'favor'
        ? null
        : tagFragment

    const homeFeed = (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <NavLink to="/home/yourfeed/1">
            <input
              type="button"
              className={this.feedClassName('yourfeed')}
              onClick={() => {
                DelArticles()
                UpdateArticlesApi('yourfeed')
              }}
              value="Your Feed"
            />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/home/globalfeed/1">
            <input
              type="button"
              className={this.feedClassName('globalfeed')}
              onClick={() => {
                DelArticles()
                UpdateArticlesApi('globalfeed')
              }}
              value="Global Feed"
            />
          </NavLink>
        </li>
        {innerTag}
      </ul>
    )

    const profileFeed = (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <input
            type="button"
            className={this.feedClassName('mypost')}
            onClick={() => {
              DelArticles()
              UpdateArticlesApi('mypost')
            }}
            value="My Post"
          />
        </li>
        <li className="nav-item">
          <input
            type="button"
            className={this.feedClassName('favor')}
            onClick={() => {
              DelArticles()
              UpdateArticlesApi('favor')
            }}
            value="Favorited Post"
          />
        </li>
        {innerTag}
      </ul>
    )
    const homeOrProfileFeed =
      params.feed === 'mypost' || params.feed === 'favor'
        ? profileFeed
        : homeFeed

    return <Fragment>{homeOrProfileFeed}</Fragment>
  }
}

export default LineFeed
