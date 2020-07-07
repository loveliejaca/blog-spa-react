import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'

import reduxPostData from './postReducer';
import reduxUserData from './userReducer';

const appReducer = combineReducers({
    /* app’s top-level reducers */
  reduxPostData,
  reduxUserData

})

const compiler = (state, action) => {
  if (action.type === 'resetReducer') {
    state = undefined
  }
  return appReducer(state, action)
}

export default compiler;
