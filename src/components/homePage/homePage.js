import React, { Component, Fragment } from 'react'
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
      articlesApi,
      UpdateArticlesAsync,
      UpdateArticlesApi,
      checkLog,
    } = this.props

    const content = articles ? <RenderArticles {...this.props} /> : <Spinner />

    const left = (
      <Fragment>
        <LineFeed
          articlesApi={articlesApi}
          UpdateArticlesAsync={UpdateArticlesAsync}
          UpdateArticlesApi={UpdateArticlesApi}
          DelArticles={this.props.DelArticles}
          checkLog={checkLog}
          params={this.props.params}
        />
        {content}
        <Pagination
          idHistory={idHistory}
          params={this.props.params}
          articlesApi={this.props.articlesApi}
          articlesCount={this.props.articlesCount}
          idPagination={this.props.idPagination}
        />
      </Fragment>
    )
    const right = <Tags />

    return <Row left={left} right={right} />
  }
}
const mapStateToProps = (state) => {
  return {
    articles: state.homePage.articles.articles,
    articlesApi: state.homePage.articlesApi,
    articlesCount: state.homePage.articles.articlesCount,
    checkLog: state.registerPage.checkLog,
    idPagination: state.homePage.idPagination,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    DelArticles: () => dispatch(actions.DelArticles()),
    UpdateArticlesAsync: (tag, id) =>
      dispatch(actions.UpdateArticlesAsync(tag, id)),
    SetUserFavorite: (userId, paginationId, tag, favorited) =>
      dispatch(actions.SetUserFavorite(userId, paginationId, tag, favorited)),
    GetProfileInfo: (username) => dispatch(actions.GetProfileInfo(username)),
    UpdateArticlesApi: (articlesApi) => {
      dispatch(actions.UpdateArticlesApi(articlesApi))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
