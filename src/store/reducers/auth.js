import {
  AUTH,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  DISABLED_BUTTONS,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  CURRENT_EMAIL,
} from '../actions/actionTypes'

const initialState = {
  currentEmail: '',
  email: '',
  password: '',
  isLogin: false,
  token: null,
  isDisabledButtons: false,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      }
    case CURRENT_EMAIL:
      return {
        ...state,
        currentEmail: action.currentEmail,
      }
    case AUTH:
      return {
        ...state,
        email: action.email,
        password: action.password,
        isLogin: action.isLogin,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
      }
    case DISABLED_BUTTONS:
      return {
        ...state,
        isDisabledButtons: action.isDisabledButtons,
      }
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.email,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.password,
      }
    default:
      return state
  }
}
