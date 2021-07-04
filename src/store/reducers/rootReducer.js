import { combineReducers } from 'redux'
import editReducer from './edit'
import postReducer from './post'

export default combineReducers({
  post: postReducer,
  edit: editReducer,
})
