import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import './header.css'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    const { username, image } = this.props.user
    const hrefUser = `/profile/${username}/mypost/1`
    const homeLink = `/home/globalfeed/1`

    const registr = (
      <Fragment>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Sign in
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign up
          </NavLink>
        </li>
      </Fragment>
    )

    const authorize = (
      <Fragment>
        <li className="nav-item">
          <NavLink className="nav-link" to="/editor">
            <div onClick={this.props.CleanNewArticlePage}>
              <i className="ion-compose fa fa-pencil-square-o" />
              New Article
            </div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/settings">
            <i className="fa fa-cog"></i>
            Settings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={hrefUser}>
            <img className="user-pic" src={image} alt="avatar" />
            {username}
          </NavLink>
        </li>
      </Fragment>
    )

    const checkLog = this.props.checkLog ? authorize : registr

    return (
      <div>
        <nav className="navbar navbar-light">
          <div className="container">
            <NavLink className="navbar-brand ng-binding" to={homeLink}>
              conMackHabibych
            </NavLink>
            <ul className="navbar-nav list-group list-group-horizontal">
              <li className="nav-item">
                <NavLink className="nav-link" to={homeLink}>
                  Home
                </NavLink>
              </li>
              {checkLog}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    checkLog: state.registerPage.checkLog,
    user: state.registerPage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    CleanNewArticlePage: () => dispatch(actions.CleanNewArticlePage()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
