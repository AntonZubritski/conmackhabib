import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class SignUp extends Component {
  render() {
    return (
      <div>
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <NavLink to="/login">Have an account?</NavLink>
        </p>
        <ul className="error-messages"></ul>
        <form className="ng-untouched ng-pristine ng-invalid">
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
            placeholder="Username"
            type="text"
            onChange={this.props.changeAuth}
            name={'username'}
            value={this.props.username}
          ></input>
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            placeholder="Email"
            type="email"
            onChange={this.props.changeAuth}
            name={'email'}
            value={this.props.email}
          ></input>
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            placeholder="Password"
            type="password"
            onChange={this.props.changeAuth}
            name={'password'}
            value={this.props.password}
          ></input>
        </form>
        <NavLink to="/settings">
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            name="registration"
            onClick={this.props.logRegUser}
          >
            Sign up
          </button>
        </NavLink>
      </div>
    )
  }
}

class LogIn extends Component {
  render() {
    return (
      <div>
        <h1 className="text-xs-center">Sign in</h1>
        <p className="text-xs-center">
          <NavLink to="/signup">Need an account?</NavLink>
        </p>
        <ul className="error-messages"></ul>
        <form className="ng-untouched ng-pristine ng-invalid">
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            formcontrolname="email"
            placeholder="Email"
            onChange={this.props.changeAuth}
            name={'email'}
            value={this.props.email}
            type="email"
          ></input>
          <input
            className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
            formcontrolname="password"
            placeholder="Password"
            onChange={this.props.changeAuth}
            name={'password'}
            value={this.props.password}
            type="password"
          ></input>
        </form>
        <NavLink to="/settings">
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            name="login"
            onClick={this.props.logRegUser}
          >
            Sign in
          </button>
        </NavLink>
      </div>
    )
  }
}
export { LogIn, SignUp }
