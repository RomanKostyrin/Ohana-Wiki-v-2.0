import axios from 'axios'
import {
  AUTH,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  DISABLED_BUTTONS,
} from './actionTypes'

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    dispatch(isDisabled(true))

    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU'

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU'
    }
    try {
      const response = await axios.post(url, authData)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }

    dispatch(isDisabled(false))
  }
}
export function isDisabled(bool) {
  return (dispatch) => {
    dispatch(isDisabledButtonsFunction(bool))
  }
}
export function onChangeLogin(event) {
  event.preventDefault()

  return (dispatch) => {
    dispatch(changeEmail(event.target.value))
  }
}

export function onChangePassword(event) {
  event.preventDefault()

  return (dispatch) => {
    dispatch(changePassword(event.target.value))
  }
}

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  }
}
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  }
}

export function authDispatcher(bool) {
  return {
    type: AUTH,
    bool,
  }
}

export function isDisabledButtonsFunction(isDisabledButtons) {
  return {
    type: DISABLED_BUTTONS,
    isDisabledButtons,
  }
}
