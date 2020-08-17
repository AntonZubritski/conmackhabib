import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'

class Comments extends Component {
  postCommentRef = React.createRef()
  changeComment = (e) => {
    const value = e.target.value
    this.props.ChangeComment(value)
  }

  postComment = (e) => {
    e.preventDefault()
    const { slug } = this.props.profilePage.article
    const comment = { comment: { body: this.props.profilePage.textComment } }
    this.props.PostComment(slug, comment)
  }

  handleKeyPress = (e) => {
    const { textComment } = this.props.profilePage
    if (e.charCode === 13 && !textComment.trim() === false) {
      e.preventDefault()
      this.postCommentRef.dispatchEvent(new Event('submit'))
    }
  }

  render() {
    const { comments, textComment } = this.props.profilePage
    const { image, username, token } = this.props.registerPage

    // --------------------COMMENTS MAP--------------------
    const comment = comments.map((comment, key) => {
      const { body, author, id, createdAt } = comment

      const delComment = () => {
        const { idArticle } = this.props.match.params
        const newComments = [].concat(comments)
        newComments.splice(key, 1)
        this.props.DeleteComment(idArticle, id, newComments)
      }
      const trashIcon = (
        <span className="mod-options btn-icon">
          <i className="fa fa-trash-o" onClick={delComment} />
        </span>
      )
      const trashIconSwitch = username === author.username ? trashIcon : null
      return (
        <div className="card" key={key + body}>
          <fieldset>
            <div className="card-block-comments">
              <p className="card-text"> {body} </p>
            </div>
            <div className="card-footer">
              <NavLink
                className="comment-author"
                to={`/profile/${author.username}/mypost/1`}
              >
                <img
                  className="comment-author-img user-pic"
                  src={author.image}
                  alt="avatar"
                />
              </NavLink>
              <NavLink
                className="comment-author"
                to={`/profile/${author.username}/mypost/1`}
              >
                {author.username}
              </NavLink>
              <span className="date-posted">
                {this.props.transformDate(createdAt)}
              </span>
              {trashIconSwitch}
            </div>
          </fieldset>
        </div>
      )
    })
    // --------------------COMMENTS MAP END--------------------

    // --------------------POST FORM---------------------------
    const postForm = (
      <div className=" container row bounceInUp2">
        <div className="col-xs-12 col-md-12">
          <div>
            <ul className="error-messages"></ul>
            <form
              className="card comment-form"
              ref={(e) => (this.postCommentRef = e)}
              onSubmit={this.postComment}
            >
              <fieldset>
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    onChange={this.changeComment}
                    onKeyPress={this.handleKeyPress}
                    value={textComment}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    className="comment-author-img"
                    src={image}
                    alt="avatar"
                  />
                  <input
                    className="btn btn-sm btn-primary"
                    type="submit"
                    value="Post Comment"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
    // --------------------POST FORM END--------------------

    const commentsInner =
      this.props.profilePage.comments !== [] ? comment : null // проверить - упростить
    return (
      <Fragment>
        {token ? postForm : null}
        <div className="container bounceInUp2">{commentsInner}</div>
      </Fragment>
    )
  }
}
export default Comments

//Comments
