import React, { Component } from 'react'
import './renderArticles.css'
import './animationArticles.scss'
import { NavLink } from 'react-router-dom'

class RenderArticles extends Component {
  render() {
    const { articles, SetUserFavorite, token} = this.props

    const articlesList = articles.map((item, key) => {
      const {
        title,
        description,
        image,
        userName,
        created,
        tags,
        favorited,
        favoritesCount,
        userId,
      } = item
      const { feed } = this.props.params
      const classFavorButt = favorited
        ? 'btn btn-sm btn-outline-primary active'
        : 'btn btn-sm btn-outline-primary'

      const tagsList = (tag) => {
        if (tag !== undefined) {
          return tag.map((tag, key) => {
            return (
              <NavLink to={`/home/${tag}/1`} key={key}>
                <input
                  className="tag-default tag-pill tag-outline
                    ng-binding ng-scope"
                  type={'button'}
                  value={tag}
                />
              </NavLink>
            )
          })
        }
      }
      const bounce = `article-preview  bounceInUp${key + 1}`

      return (
        <div className={bounce} key={key}>
          <div className="article-meta">
            <img src={image} alt="img"></img>
            <div className="info">
              <NavLink
                to={`/profile/${userName}/mypost/1`}
                className="author ng-binding"
              >
                {userName}
              </NavLink>

              <span className="date ng-binding">{created}</span>
            </div>
            <button
              className={classFavorButt}
              onClick={() =>
                token ? 
                SetUserFavorite(
                  userId,
                  1,
                  feed,
                  favorited,
                  userName
                ) : null
              }
            >
              <i className="fa fa-heart"></i>
              <span className="padding-left">{favoritesCount}</span>
            </button>
          </div>
          <NavLink className="preview-link" to={`/readmore/${userId}`}>
            <h1>{title}</h1>
            <p>{description}</p>
            <span className="more">Read more...</span>
          </NavLink>

          <ul className="tag-list">{tagsList(tags)}</ul>
        </div>
      )
    })

    return articlesList
  }
}

export default RenderArticles
