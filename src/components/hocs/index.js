import React, { Component, Fragment } from 'react'
import * as actions from '../../redux/actions'
import Header from '../header'
import Footer from '../footer'
import Banner from '../banner'
import ApiServices from '../../services/api-services'
import { connect } from 'react-redux'
import { compose } from 'redux'

const withRegistrationHoc = (View) => {
  return class extends Component {
    api = new ApiServices()

    logRegUser = async (e) => {
      const { UpdateLogRegInfo, username, email, password } = this.props
      const objUser = {
        user: {
          email: email,
          password: password,
          username: username,
        },
      }

      if (e.target.name === 'login') {
        UpdateLogRegInfo(objUser, 'login')
      } else if (e.target.name === 'registration') {
        UpdateLogRegInfo(objUser)
      }
    }
    changeAuth = (e) => this.props.onChangeAuth(e.target.name, e.target.value)

    render() {
      const { username, email, password } = this.props

      return (
        <Fragment>
          <Header />
          <div className="auth-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                  <View
                    username={username}
                    email={email}
                    password={password}
                    logRegUser={this.logRegUser}
                    changeAuth={this.changeAuth}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )
    }
  }
}

const withHomeHoc = (View) => {
  return class extends Component {
    componentDidMount = () => {
      const { feed, id, userName } = this.props.match.params
      this.props.UpdateArticlesAsync(feed, id, userName)
    }

    componentDidUpdate = (prevProps) => {
      const { match } = this.props
      if (prevProps.match.params.feed !== match.params.feed) {
        this.props.UpdateArticlesAsync(
          match.params.feed,
          match.params.id,
          match.params.userName
        )
      }
    }

    render() {
      const historyPush = (feed, id) => {
        this.props.history.push(`/home/${feed}/${id}`)
      }
      const historyPushProfile = (userName, feed, id) => {
        this.props.history.push(`/profile/${userName}/${feed}/${id}`)
      }

      return (
        <div>
          <Header />
          <Banner />
          <View
            idHistory={historyPush}
            historyProfile={historyPushProfile}
            params={this.props.match.params}
          />
          <Footer />
        </div>
      )
    }
  }
}
const withSettAndArticHoc = (View) => {
  return class extends Component {
    handleChange = (e) => {
      this.props.onChangeAuthArticle(e.target.name, e.target.value)
    }
    handleChangeTag = (e) => {
      this.props.onChangeTag(e.target.value)
    }
    historyPushReadMore = (page, id) => {
      this.props.history.push(`/${page}/${id}`)
    }
    historyPush = (feed, id) => {
      this.props.history.push(`/home/${feed}/${id}`)
    }
    setTags = () => {
      const { tagList } = this.props.article
      const { tag } = this.props
      const newArray = tagList.concat()
      newArray.push(tag)
      this.props.setTag(newArray)
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const { slug } = this.props.article
      const { edit } = this.props
      const objArticle = {
        article: { ...this.props.article },
      }
      if (edit) {
        this.props.PutEditArticle(objArticle, slug)
        this.historyPushReadMore('readmore', slug)
      } else {
        this.props.PostNewArticle(objArticle)
        this.historyPush('globalfeed', 1)
      }
    }

    render() {
      return (
        <div>
          <Header />
          <View
            handleChange={this.handleChange}
            handleChangeTag={this.handleChangeTag}
            handleSubmit={this.handleSubmit}
            newArticlestate={this.props.newArticle}
            setTags={this.setTags}
          />
          <Footer />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.registerPage.email,
    password: state.registerPage.password,
    username: state.registerPage.username,
    article: state.profilePage.article,
    edit: state.profilePage.edit,
    tag: state.profilePage.tag,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeAuth: (name, value) =>
      dispatch(actions.UpdateFieldAuth(name, value)),
    onChangeTag: (value) => dispatch(actions.handleChangeTag(value)),
    onChangeAuthArticle: (name, value) =>
      dispatch(actions.SetPostArticle(name, value)),
    UpdateLogRegInfo: (value, url) =>
      dispatch(actions.UpdateLogRegInfo(value, url)),
    UpdateIdPagination: (id) => dispatch(actions.UpdateIdPagination(id)),
    UpdateArticlesAsync: (tag, id, username) =>
      dispatch(actions.UpdateArticlesAsync(tag, id, username)),
    PostNewArticle: (objArticlesInfo) =>
      dispatch(actions.PostNewArticle(objArticlesInfo)),
    PutEditArticle: (objArticlesInfo, slug) =>
      dispatch(actions.PutEditArticle(objArticlesInfo, slug)),
    setTag: (tag) => dispatch(actions.SetTag(tag)),
  }
}

const withRegistration = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRegistrationHoc
)
const withHome = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHomeHoc
)
const withSettArt = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSettAndArticHoc
)

export { withRegistration, withHome, withSettArt }
