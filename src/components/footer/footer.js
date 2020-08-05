import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <NavLink className="logo-font" to="/home">
            ConMackHabibych
          </NavLink>
          <span className="attribution">
            {' '}
            © 2020 Project A.zubritski
            <a href="https://www.instagram.com/a.zubritski/">
              {' '}
              Instagram{' '}
            </a>{' '}
            owl&penguin inc.
          </span>
        </div>
      </footer>
    )
  }
}
export default Footer
