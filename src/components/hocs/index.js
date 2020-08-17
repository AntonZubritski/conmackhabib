import React, { Component, Fragment } from 'react'
import * as actions from '../../redux/actions'
import Header from '../header'
import Footer from '../footer'
import Banner from '../banner'
import { connect } from 'react-redux'
import { compose } from 'redux'

const withRegistrationHoc = (View) => {
  return class extends Component {
    historyPush = (feed, id) => {
      this.props.history.push(`/home/${feed}/${id}`)
    }

    logRegUser = (e) => {
      const { UpdateLogRegInfo } = this.props
      const { username, email, password } = this.props.registerPage
      const objUser = {
        user: {
          email: email,
          password: password,
          username: username,
        }
      }
      e.preventDefault()
      if (e.target.name === 'login') {
        UpdateLogRegInfo(objUser, 'login')
      } else if (e.target.name === 'registration') {
        UpdateLogRegInfo(objUser, '')
      }
      return true
    }

    changeAuth = (e) => this.props.onChangeAuth(e.target.name, e.target.value)

    render() {
      const { username, email, password } = this.props.registerPage

      return (
        <Fragment>
          <Header />
          <div className="auth-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <View
                    username={username}
                    email={email}
                    password={password}
                    logRegUser={this.logRegUser}
                    changeAuth={this.changeAuth}
                    historyPush={this.historyPush}
                    errorReg={this.props.errorReg}
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
      let paramsId = id
      if (id === undefined) {
        paramsId = 1
      }
      this.props.UpdateArticlesAsync(feed, paramsId, userName)
    }

    componentDidUpdate = (prevProps) => {
      const { match } = this.props
      if (
        prevProps.match.params.feed !== match.params.feed ||
        prevProps.match.params.id !== match.params.id
      ) {
        this.props.DelArticles()
        this.props.UpdateArticlesAsync(
          match.params.feed,
          match.params.id,
          match.params.userName
        )
      }
    }
    historyPush = (feed, id) => {
      this.props.history.push(`/home/${feed}/${id}`)
    }
    historyPushProfile = (userName, feed, id) => {
      this.props.history.push(`/profile/${userName}/${feed}/${id}`)
    }

    render() {
      return (
        <>
          <Header />
          <Banner />
          <View
            idHistory={this.historyPush}
            idHistoryProfile={this.historyPushProfile}
            params={this.props.match.params}
            token={this.props.token}
          />
          <Footer />
        </>
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
      const { tagList } = this.props.profilePage.article
      const { tag } = this.props.profilePage
      const newArray = tagList.concat()
      newArray.push(tag)
      this.props.setTag(newArray)
    }

    handleSubmit = (e) => {
      debugger
      e.preventDefault()
      const { slug } = this.props.profilePage.article
      const { edit } = this.props.profilePage
      const objArticle = {
        article: { ...this.props.profilePage.article },
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
    registerPage: state.registerPage,
    profilePage: state.profilePage,
    errorReg: state.homePage.errorReg,
    token: state.registerPage.token,
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
    UpdateArticlesAsync: (tag, id, username) =>
      dispatch(actions.UpdateArticlesAsync(tag, id, username)),
    PostNewArticle: (objArticlesInfo) =>
      dispatch(actions.PostNewArticle(objArticlesInfo)),
    PutEditArticle: (objArticlesInfo, slug) =>
      dispatch(actions.PutEditArticle(objArticlesInfo, slug)),
    setTag: (tag) => dispatch(actions.SetTag(tag)),
    DelArticles: () => dispatch(actions.DelArticles()),
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
