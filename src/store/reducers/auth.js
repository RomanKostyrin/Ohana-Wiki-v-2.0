import {
  AUTH,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  DISABLED_BUTTONS,
} from '../actions/actionTypes'

const initialState = {
  currentEmail: 'kostyrin@ohanafitness.ru',
  email: '',
  password: '',
  isLogin: false,
  token: null,
  isDisabledButtons: false,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        email: action.email,
        password: action.password,
        isLogin: action.isLogin,
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
