import axios from 'axios'
import {
  AUTH,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  DISABLED_BUTTONS,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  CURRENT_EMAIL,
} from './actionTypes'

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    dispatch(isDisabled(true))

    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    const url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU'

    try {
      const response = await axios.post(url, authData)
      const data = response.data
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      )
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)
      localStorage.setItem('email', data.email)
      localStorage.setItem('expirationDate', expirationDate)
      console.log(data.idToken)
      dispatch(authSuccess(data.idToken))
      dispatch(autoLogOut(data.expiresIn))
      dispatch(logAs(data.email))
    } catch (e) {
      console.log(e)
    }

    dispatch(isDisabled(false))
  }
}

export function autoLogOut(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}
export function LoggedAs(AsName) {
  return (dispatch) => {
    dispatch(logAs(AsName))
  }
}
export function isDisabled(bool) {
  return (dispatch) => {
    dispatch(isDisabledButtonsFunction(bool))
  }
}
export function onChangeLogin(event) {
  return (dispatch) => {
    dispatch(changeEmail(event.target.value))
  }
}

export function onChangePassword(event) {
  return (dispatch) => {
    dispatch(changePassword(event.target.value))
  }
}
export function logAs(currentEmail) {
  return {
    type: CURRENT_EMAIL,
    currentEmail,
  }
}
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('email')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT,
    currentEmail: '',
  }
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
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
