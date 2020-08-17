import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import SettingsPage from '../settings'
import ProfilePage from '../profilePage'
import { LogIn, SignUp } from '../registration'
import { withRegistration, withHome, withSettArt } from '../hocs'
import HomePage from '../homePage'
import ReadMore from '../readMore'
import NewArticles from '../new-articles'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import './app.css'
import ErrorBoundary from '../error-boundary'

class App extends Component {
  UNSAFE_componentWillMount() {
    const token = window.localStorage.getItem('jwt')
    const { UpdateLogToken } = this.props
    if (token !== null) {
      UpdateLogToken(token)
    }
  }

  render() {
    const LogInPage = withRegistration(LogIn)
    const SignUpPage = withRegistration(SignUp)
    const Home = withHome(HomePage)
    const Settings = withHome(SettingsPage)
    const Profile = withHome(ProfilePage)
    const NewArticle = withSettArt(NewArticles)

    return (
      <BrowserRouter>
      <ErrorBoundary>
        <Switch>
            <Route path="/home/:feed?/:id?" component={Home} />
            <Route path="/login" component={LogInPage} exact />
            <Route path="/signup" component={SignUpPage} exact />
            <Route path="/editor" component={NewArticle} exact />
            <Route path="/settings" component={Settings} exact />
            <Route path="/profile/:userName?/:feed?/:id?" component={Profile} />
            <Route path="/readmore/:idArticle" component={ReadMore} exact />
            <Redirect path="/" to="/home/globalfeed/1" />
        </Switch>
      </ErrorBoundary>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.registerPage.regInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateLogToken: () => dispatch(actions.UpdateLogToken())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
