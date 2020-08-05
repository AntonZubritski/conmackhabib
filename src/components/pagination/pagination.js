import React, { Component } from 'react'
import './pagination.css'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

class Pagination extends Component {
  componentDidUpdate(PrevProps) {
    const { idPagination, idHistory, articlesApi } = this.props
    const { userName } = this.props.params

    if (
      PrevProps.idPagination !== idPagination ||
      PrevProps.articlesApi !== articlesApi
    ) {
      articlesApi === 'favor' || articlesApi === 'mypost'
        ? idHistory(userName, articlesApi, idPagination)
        : idHistory(articlesApi, idPagination)
    }
  }

  renderPagination = () => {
    const {
      idPagination,
      articlesCount,
      articlesApi,
      UpdateArticlesAsync,
    } = this.props
    const { userName } = this.props.params

    let paramsId = this.props.params.id
    if (paramsId === undefined) {
      paramsId = idPagination // idPagination = 1;
    }

    return articlesCount.map((item, key) => {
      const classActive = +paramsId === item ? 'page-item active' : 'page-item'

      return (
        <li className={classActive} key={key}>
          <input
            type="button"
            onClick={() => UpdateArticlesAsync(articlesApi, item, userName)}
            className="page-link"
            value={item}
          />
        </li>
      )
    })
  }

  render() {
    const { articlesCount } = this.props
    const paginationCount =
      articlesCount !== null ? this.renderPagination() : null
    return <ul className="pagination bounceInUp2">{paginationCount}</ul>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateArticlesAsync: (tag, id, username) =>
      dispatch(actions.UpdateArticlesAsync(tag, id, username)),
  }
}

export default connect(undefined, mapDispatchToProps)(Pagination)
