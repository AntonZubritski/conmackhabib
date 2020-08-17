import React, { Component } from 'react'
import Header from '../header'
import Banner from '../banner'
import Comments from '../comments'
import Footer from '../footer'
import { NavLink } from 'react-router-dom'
import { svgFollowIcon, svgUnfollowIcon } from '../readMore'
import './readMore.css'
import './animationReadmore.scss'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

class ReadMore extends Component {
  componentDidMount() {
    const { idArticle } = this.props.match.params
    this.props.GetReadMoreArticle(idArticle)
  }
  favorClick = () => {
    const { idArticle } = this.props.match.params
    const { favorited } = this.props.profilePage.article
    this.props.SetPostFavorite(idArticle, favorited)
  }
  transformDate = (created) => {
    const day = new Date(created).getDate()
    const month = new Date(created).toLocaleString('en', { month: 'long' })
    const year = new Date(created).getFullYear()
    return `${month} ${day}, ${year}`
  }

  render() {
    const { token } = this.props.registerPage
    const { registerPage } = this.props
    const {
      bio,
      following,
      image,
      username,
    } = this.props.profilePage.article.author
    const {
      body,
      createdAt,
      favoritesCount,
      title,
      tagList,
      description,
      slug,
    } = this.props.profilePage.article

    //Animation Banner
    const circleAnim = (num) => {
      let cirlce = []
      for (let i = 1; i <= num; i++) {
        cirlce.push(<div className="circle" key={num + i} />)
      }
      return cirlce
    }
    //Animation Banner END

    const btnMyUser = (
      <>
        <NavLink to={'/home'}>
          <span className="mod-options btn-icon">
            <i
              className="fa fa-trash-o"
              onClick={() => this.props.DeleteArticle(slug)}
            />
          </span>
        </NavLink>

        <NavLink to={'/editor'}>
          <span className="mod-options btn-icon">
            <i className="fa fa-pencil" onClick={() => this.props.EditMode()} />
          </span>
        </NavLink>
      </>
    )

    const btnUser = (
      <>
        <span
          className="mod-options"
          onClick={() => {
            this.props.GetProfileInfo(username, following)
          }}
        >
          <i className="ion-plus-round" />
          {following ? svgUnfollowIcon : svgFollowIcon}
        </span>
        <span className="mod-options btn-icon" onClick={this.favorClick}>
          <i className="fa fa-heart" />
          {favoritesCount}
        </span>
      </>
    )

    const readmorePage = (
      <div className="readmore-page background bounceInRight2">
        {circleAnim(15)}
        <div className="container">
          <div className="article-meta">
            <a href="/profile/freddy-test">
              <img src={image} alt="avatar" />
            </a>
            <div className="info">
              <a className="author" href="/profile/freddy-test">
                {username}
              </a>
              <span className="date"> {this.transformDate(createdAt)} </span>
              <span className="bio">{bio}</span>
            </div>
          </div>
        </div>
      </div>
    )

    const btn = registerPage.username === username ? btnMyUser : btnUser

    const containerPage = (
      <div className="container comment">
        <div className="bounceInUp1">
          <div className="btn-group-deled">{token ? btn : null}</div>
          <hr />
          <div className="title-article">
            <h1>{title}</h1>
            <h6>{description}</h6>
          </div>
          <div className="row article-content">
            <div className="col-md-11">
              <div>
                <p>{body}</p>
              </div>
            </div>
          </div>
          <hr />
          <ul>
            {tagList.map((tag, key) => {
              return (
                <li className="tag-default tag-pill tag-outline" key={key}>
                  {tag}
                </li>
              )
            })}
          </ul>
          <hr />
        </div>
      </div>
    )

    return (
      <>
        <Header />
        <Banner container={readmorePage} classBanner={'bannerMore'} />
        {containerPage}
        <Comments transformDate={this.transformDate} {...this.props} />
        <Footer />
      </>
    )
  }
}

// --------------------CONNECT--------------------
const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
    registerPage: state.registerPage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    GetReadMoreArticle: (articleId) =>
      dispatch(actions.GetReadMoreArticle(articleId)),
    PostComment: (articleId, comment) =>
      dispatch(actions.PostComment(articleId, comment)),
    DeleteComment: (articleId, id, key) =>
      dispatch(actions.DeleteComment(articleId, id, key)),
    GetComment: (articleId) => dispatch(actions.GetComment(articleId)),
    ChangeComment: (comment) => dispatch(actions.UpdateFieldComment(comment)),
    SetPostFavorite: (userId, favorited) =>
      dispatch(actions.SetPostFavorite(userId, favorited)),
    GetProfileInfo: (username, following) =>
      dispatch(actions.GetProfileInfo(username, following)),
    EditMode: () => dispatch(actions.EditMode()),
    DeleteArticle: (slug) => dispatch(actions.DeleteArticle(slug)),
  }
}
// -------------------END CONNECT-------------------

export default connect(mapStateToProps, mapDispatchToProps)(ReadMore)
