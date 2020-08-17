import React, { Component } from 'react'
import ApiServices from '../../services/api-services'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import './settings-page.css'

class SettingsPage extends Component {
  api = new ApiServices()

  handleChange = (e) => {
    this.props.onChangeAuth(e.target.name, e.target.value)
  }
  handleSubmit = (e) => {
    const { email, image, username, bio, password } = this.props.infoUserState
    e.preventDefault()
    const objUser = {
      user: {
        email: email,
        password: password,
        image: image,
        bio: bio,
        username: username,
      },
    }
    this.props.userPutSettings(objUser)
    this.props.idHistory('globalfeed', 1)
  }

  render() {
    const { email, image, username, bio } = this.props.infoUserState
    const { deleteUserInfo, idHistory } = this.props
    const bioUser = bio !== null ? bio : ''

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-12 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              {/* <app-list-errors> */}

              <ul className="error-messages"> </ul>
              {/* </app-list-errors> */}
              <form
                className="ng-untouched ng-pristine ng-valid"
                onSubmit={this.handleSubmit}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder="URL of profile picture"
                      value={image}
                      name="image"
                      type="text"
                      onChange={this.handleChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      placeholder="Username"
                      value={username}
                      name="username"
                      type="text"
                      onChange={this.handleChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      placeholder="Short bio about you"
                      value={bioUser}
                      name="bio"
                      rows="8"
                      onChange={this.handleChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      placeholder="Email"
                      value={email}
                      name="email"
                      type="email"
                      onChange={this.handleChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      placeholder="New Password: [A-Za-z0-9]"
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      autoComplete="on"
                      required
                      pattern="[A-Za-z0-9]{8,16}"
                    />
                  </fieldset>
                  <input
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    value="Update Settings"
                  />
                </fieldset>
              </form>
              <hr />
              <input
                className="btn btn-outline-danger"
                value="Or click here to logout."
                type="button"
                onClick={() => {
                  idHistory('globalfeed', 1)
                  deleteUserInfo()
                }}
              />
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
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeAuth: (name, value) =>
      dispatch(actions.UpdateFieldAuth(name, value)),
    userPutSettings: (settingsInfo) =>
      dispatch(actions.userPutSettings(settingsInfo)),
    deleteUserInfo: () => dispatch(actions.DeleteUserInfo()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
