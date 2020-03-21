import { combineReducers } from 'redux'
import modeReducer from './modeReducer'
import covidReducer from './covidReducer'
import postReducer from './postReducer'
// import redditReducer from './redditReducer'

export default combineReducers({
  mode: modeReducer,
  covid: covidReducer,
  posts: postReducer,
  // reddit: redditReducer,
})
