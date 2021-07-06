import React from 'react'
import classes from './Header.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import { connect } from 'react-redux'
import {
  auth,
  onChangeLogin,
  onChangePassword,
  isDisabled,
} from '../../store/actions/auth'

let popup = [classes.signIn, classes.popupShow]
let showWrapper = [classes.modalWrapper, classes.showModalWrapper]

class Header extends React.Component {
  state = {
    popup: classes.signIn,
    wrapper: classes.modalWrapper,
  }
  signInHandler = async (event) => {
    event.preventDefault()
    this.props.auth(this.props.email, this.props.password, true)
  }

  showPopup = (event) => {
    this.setState({
      popup: popup.join(' '),
      wrapper: showWrapper.join(' '),
    })
  }
  closePopup = (event) => {
    this.setState({
      popup: classes.signIn,
      wrapper: classes.modalWrapper,
    })
  }
  signOutHandler = (event) => {
    event.preventDefault()
    console.log(event.target)
  }

  render() {
    return (
      <header className={classes.Header}>
        <div className={this.state.wrapper}></div>
        <section className={this.state.popup}>
          <button
            className={classes.btnClose}
            id={`closeBtn`}
            type="button"
            title="close"
            onClick={this.closePopup}
          ></button>
          <form className={classes.signInForm}>
            <div className={classes.signInContainer}>
              <p className={classes.containerItem}>
                <Input
                  type={'text'}
                  inputTypeClass={'Input'}
                  labelTypeClass={'InputLabel'}
                  label={'Логин'}
                  name={'signInEmail'}
                  placeholder="Введите логин"
                  onChange={(event) => this.props.onChangeLogin(event)}
                  value={this.state.email}
                />
              </p>
              <p className={classes.containerItem}>
                <Input
                  type={'password'}
                  inputTypeClass={'Input'}
                  labelTypeClass={'InputLabel'}
                  label={'Пароль'}
                  name={'signInPassword'}
                  placeholder={'Введите пароль'}
                  onChange={(event) => this.props.onChangePassword(event)}
                  value={this.state.password}
                />
              </p>
            </div>
            <Button
              type={'submit'}
              id={'NewUserButton'}
              classType2={'ButtonSubmit'}
              classType={'ButtonPrimary'}
              onClick={this.signInHandler}
              disabled={this.props.isDisabledButtons}
            >
              Войти
            </Button>
          </form>
        </section>
        <div className={classes.Logo}></div>
        <Input
          label={'Логин'}
          labelTypeClass={'LabelSearch'}
          name={'Введите название'}
          type={'search'}
          inputTypeClass={'InputSearch'}
        />
        <Button
          classType={'ButtonImportant'}
          classType2={'ButtonSignIn'}
          onClick={this.showPopup}
        >
          Войти
        </Button>

        <span className={classes.LoggedAs}>
          Вы вошли как:{' '}
          <span className={classes.userName}>{this.props.currentEmail}</span>
        </span>

        <Button
          classType={'ButtonPrimary'}
          classType2={'ButtonSignOut'}
          onClick={this.signOutHandler}
        >
          Выйти
        </Button>
      </header>
    )
  }
}

function mapStatePoProps(state) {
  return {
    email: state.auth.email,
    password: state.auth.password,
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    isDisabledButtons: state.auth.isDisabledButtons,
    currentEmail: state.auth.currentEmail,
  }
}

function mapDispatchPoProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
    onChangeLogin: (event) => dispatch(onChangeLogin(event)),
    onChangePassword: (event) => dispatch(onChangePassword(event)),
    isDisabled: (bool) => dispatch(isDisabled(bool)),
  }
}

export default connect(mapStatePoProps, mapDispatchPoProps)(Header)
