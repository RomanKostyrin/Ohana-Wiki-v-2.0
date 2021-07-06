import { combineReducers } from 'redux'
import editReducer from './edit'

export default combineReducers({
  edit: editReducer,
})
