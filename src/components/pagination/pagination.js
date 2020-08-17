import React, { Component } from 'react'
import './pagination.css'
import { connect } from 'react-redux'

class Pagination extends Component {

  idPushHistory = (id) => {
    const { idHistory, idHistoryProfile } = this.props
    const { userName, feed} = this.props.params
    console.log(this.props.params);
    
    feed === 'favor' || feed === 'mypost'
    ? idHistoryProfile(userName, feed, id)
    : idHistory(feed, id)
}

  
  renderPagination = () => {
    const {
      articlesCount,
    } = this.props
    const { id } = this.props.params


    return articlesCount.map((item, key) => {      
      const classActive = +id === item ? 'page-item active' : 'page-item'

      return (
        <li className={classActive} key={key}>
          <input
            type="button"
            onClick={() => this.idPushHistory(item)}
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

export default connect(undefined, undefined)(Pagination)
