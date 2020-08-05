import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

class NewArticles extends Component {
  render() {
    const { handleSubmit, handleChange } = this.props
    const { title, description, body, tagList } = this.props.profilePage.article
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages"></ul>
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="title"
                      placeholder="Article Title"
                      value={title}
                      onChange={handleChange}
                      type="text"
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="description"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={handleChange}
                      type="text"
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="body"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={handleChange}
                      rows="8"
                      required
                    ></textarea>
                  </div>
                  <div className="form-group tag-input">
                    <input
                      className="form-control"
                      placeholder="Enter tag and push 'set tag'"
                      name="tag"
                      value={this.props.profilePage.tag}
                      onChange={this.props.handleChangeTag}
                      type="text"
                    />
                    <input
                      className="btn btn-primary"
                      type="button"
                      value="set tag"
                      onClick={this.props.setTags}
                    />
                    <div className="tag-list">
                      {tagList.map((tag, key) => {
                        return (
                          <li
                            className="tag-default tag-pill tag-outline"
                            key={key}
                          >
                            {tag}
                          </li>
                        )
                      })}
                    </div>
                  </div>
                  <input
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                    value="Publish Article"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    infoUserState: state.registerPage,
    profilePage: state.profilePage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeAuth: (name, value) =>
      dispatch(actions.UpdateFieldAuth(name, value)),
    userPutSettings: (settingsInfo) =>
      dispatch(actions.userPutSettings(settingsInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticles)
