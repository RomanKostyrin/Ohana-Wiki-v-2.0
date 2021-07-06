import { combineReducers } from 'redux'
import editReducer from './edit'
import authReducer from './auth'

export default combineReducers({
  edit: editReducer,
  auth: authReducer,
})
