import { Component } from 'react'
import Error from '../error'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

class ErrorBoundary extends Component {
  render() {
    if (this.props.error) {
      return Error(this.props.error, this.props.CleanError)
    }
    return this.props.children
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.homePage.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    CleanError: () => dispatch(actions.CleanError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
