import React, { Component } from 'react'
import './tags.css'
import * as actions from '../../redux/actions'
import { connect } from 'react-redux'

class Tags extends Component {
  componentDidMount() {
    this.props.GetTagsApi()
  }

  renderTags = () => {
    const { tags } = this.props

    return tags.map((tag, key) => {
      const bounce = `tag-default tag-pill bounceInRight${key + 1}`
      if (tag.match(/\u200C/g)) {
        return null
      } else {
        return (
          <input
            type="button"
            className={bounce}
            onClick={() => {
              // DelArticles()
              // UpdateArticlesApi(tag)
              this.props.idHistory(tag, 1)
            }}
            key={key}
            value={tag}
          />
        )
      }
    })
  }

  render() {
    const { tags } = this.props
    const content = tags ? this.renderTags() : null

    return (
      <div className="sidebar bounceInRight0">
        <p>Popular Tags</p>
        <div className="tag-list">{content}</div>
      </div>
    )
  }
}
const MapStateToProps = (state) => {
  return {
    tags: state.homePage.tags,
  }
}
const MapDispatchToProps = (dispatch) => {
  return {
    GetTagsApi: () => dispatch(actions.GetTagsApi()),
    DelArticles: () => dispatch(actions.DelArticles()),
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(Tags)
