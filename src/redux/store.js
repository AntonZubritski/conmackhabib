import { createStore, combineReducers, applyMiddleware } from 'redux'
import { registerReducer, homeReducer, profileReducer } from './reducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  registerPage: registerReducer,
  homePage: homeReducer,
  profilePage: profileReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

const update = () => {
  console.log(store.getState())
}
store.subscribe(update)

export default store
