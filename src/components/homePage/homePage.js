import React, { Component } from 'react'
import Pagination from '../pagination'
import Row from '../row'
import Tags from '../tags'
import Spinner from '../spinner'
import LineFeed from '../lineFeed'
import { connect } from 'react-redux'
import RenderArticles from '../renderArticles'
import * as actions from '../../redux/actions'

class HomePage extends Component {
  render() {
    const {
      idHistory,
      articles,
      UpdateArticlesAsync,
      checkLog,
      idHistoryProfile
    } = this.props

    const content = articles ? <RenderArticles {...this.props} /> : <Spinner />

    const left = (
      <>
        <LineFeed
          UpdateArticlesAsync={UpdateArticlesAsync}
          DelArticles={this.props.DelArticles}
          token = {this.props.token}
          checkLog={checkLog}
          params={this.props.params}
        />
        {content}
        <Pagination
          idHistory={idHistory}
          idHistoryProfile={idHistoryProfile}
          params={this.props.params}
          articlesCount={this.props.articlesCount}
        />
      </>
    )
    const right = <Tags 
      idHistory={idHistory}
    />

    return <Row left={left} right={right} />
  }
}
const mapStateToProps = (state) => {
  return {
    articles: state.homePage.articles.articles,
    articlesCount: state.homePage.articles.articlesCount,
    checkLog: state.registerPage.checkLog,
    token: state.registerPage.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    DelArticles: () => dispatch(actions.DelArticles()),
    UpdateArticlesAsync: (tag, id) =>
      dispatch(actions.UpdateArticlesAsync(tag, id)),
    SetUserFavorite: (userId, paginationId, tag, favorited) =>
      dispatch(actions.SetUserFavorite(userId, paginationId, tag, favorited)),
    GetProfileInfo: (username) => dispatch(actions.GetProfileInfo(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
