import React from 'react'
import store from './redux/store'
import ReactDOM from 'react-dom'
import App from './components/app'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App store={store} dispatch={store.dispatch.bind(store)} />
  </Provider>,
  document.getElementById('root')
)
