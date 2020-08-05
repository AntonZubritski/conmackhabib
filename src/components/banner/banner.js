import React, { Component, Fragment } from 'react'
import './banner.css'
import { connect } from 'react-redux'

class Banner extends Component {
  render() {
    const { container } = this.props
    const containerHome = (
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conMackHabibych</h1>
          <p>REACT knowledge.</p>
        </div>
      </div>
    )
    const bannerContainer = !this.props.token ? containerHome : container

    return <Fragment>{bannerContainer}</Fragment>
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.registerPage.token,
  }
}

export default connect(mapStateToProps)(Banner)
