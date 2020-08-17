import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './registration.css'

class SignUp extends Component {
  submitSignUp = async (e) => {
    const { logRegUser } = this.props
    await logRegUser(e)
  }

  render() {
    const { changeAuth, username, email, password, errorReg } = this.props

    return (
      <>
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <NavLink to="/login">Have an account?</NavLink>
        </p>
        <ul className="error-messages"></ul>
        <form
          className="ng-untouched ng-pristine ng-invalid"
          name="registration"
          onSubmit={this.submitSignUp}
        >
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
            placeholder="Username"
            type="text"
            onChange={changeAuth}
            name={'username'}
            value={username}
            required
          />
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            placeholder="Email"
            type="email"
            onChange={changeAuth}
            name={'email'}
            value={email}
            required
          />
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            placeholder="Password"
            type="password"
            onChange={changeAuth}
            name={'password'}
            value={password}
            required
          />
          <p className="regAlert">{errorReg ? errorReg : null}</p>
          <hr />
          <input
            className="btn btn-lg btn-primary pull-xs-right"
            value="Sign up"
            type="submit"
          />
        </form>
      </>
    )
  }
}

class LogIn extends Component {
  render() {
    const { errorReg } = this.props
    return (
      <>
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <NavLink to="/signup">Need an account?</NavLink>
        </p>
        <ul className="error-messages"></ul>
        <form
          className="ng-untouched ng-pristine ng-invalid"
          onSubmit={this.props.logRegUser}
          name="login"
        >
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            formcontrolname="email"
            placeholder="Email"
            onChange={this.props.changeAuth}
            name="email"
            value={this.props.email}
            type="email"
            required
          />
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            formcontrolname="password"
            placeholder="Password"
            onChange={this.props.changeAuth}
            name={'password'}
            value={this.props.password}
            type="password"
            required
          />
          <p
            className={
              errorReg === 'Конгратилатион' ? 'regAlertGreen' : 'regAlertRed'
            }
          >
            {errorReg ? errorReg : null}
          </p>
          <hr />
          <input
            type="submit"
            className="btn btn-lg btn-primary pull-xs-right"
            value="Sign in"
          />
        </form>
      </>
    )
  }
}
export { LogIn, SignUp }
