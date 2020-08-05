import React, { Component } from 'react'
import Spinner from '../spinner'
import ApiServices from '../../services/api-services'
import Pagination from '../pagination'
import RenderArticles from '../renderArticles'
import LineFeed from '../lineFeed'
import './profilePage.css'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

class ProfilePage extends Component {
  api = new ApiServices()

  componentDidMount() {
    const { userName } = this.props.params
    this.props.GetProfileInfo(userName)
  }

  render() {
    const { userName } = this.props.params

    const follow = (
      <button
        className="btn btn-sm action-btn btn-secondary"
        onClick={() =>
          this.props.GetProfileInfo(userName, this.props.profile.following)
        }
      >
        <i className="fa fa-plus-circle" />
        {` Follow ${userName}`}
      </button>
    )
    const unFollow = (
      <button
        className="btn btn-sm btn-secondary action-btn"
        onClick={() =>
          this.props.GetProfileInfo(userName, this.props.profile.following)
        }
      >
        <i className="fa fa-plus-circle" />
        {` Unfollow ${userName}`}
      </button>
    )

    const { articles, UpdateArticlesApi } = this.props
    const { username, bio, image, following } = this.props.profile
    const content = !articles ? <Spinner /> : <RenderArticles {...this.props} />
    const followInner = following ? unFollow : follow

    const profileInfo = (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img className="user-img" src={image} alt="avatar" />
            <h4>{username}</h4>
            <p>{bio}</p>
            {followInner}
          </div>
        </div>
      </div>
    )

    return (
      <div>
        <div className="profile-page">
          <div className="user-info">{profileInfo}</div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <LineFeed
                  articlesApi={this.props.articlesApi}
                  UpdateArticlesAsync={this.props.UpdateArticlesAsync}
                  checkLog={this.props.checkLog}
                  idHistory={this.props.historyProfile}
                  params={this.props.params}
                  DelArticles={this.props.DelArticles}
                  UpdateArticlesApi={UpdateArticlesApi}
                />

                <div className="app-article-preview">
                  {content}
                  No articles are here... yet.
                </div>

                <nav>
                  <Pagination
                    idHistory={this.props.historyProfile}
                    params={this.props.params}
                    articlesApi={this.props.articlesApi}
                    articlesCount={this.props.articlesCount}
                    idPagination={this.props.idPagination}
                  />
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    articles: state.homePage.articles.articles,
    articlesApi: state.homePage.articlesApi,
    articlesCount: state.homePage.articles.articlesCount,
    profile: state.profilePage.article.author,
    checkLog: state.registerPage.checkLog,
    idPagination: state.homePage.idPagination,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    DelArticles: () => dispatch(actions.DelArticles()),
    GetProfileInfo: (username, following) =>
      dispatch(actions.GetProfileInfo(username, following)),
    SetUserFavorite: (userId, paginationId, tag, favorited, username) =>
      dispatch(
        actions.SetUserFavorite(userId, paginationId, tag, favorited, username)
      ),
    UpdateArticlesAsync: (tag, id, username) =>
      dispatch(actions.UpdateArticlesAsync(tag, id, username)),
    UpdateArticlesApi: (articlesApi) => {
      dispatch(actions.UpdateArticlesApi(articlesApi))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
