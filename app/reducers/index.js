import { combineReducers } from 'redux'
import repl from './repl'
import settings from './settings'

const rootReducer = combineReducers({
  repl,
  settings
})

export default rootReducer
