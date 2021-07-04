import React from 'react'
import classes from './Header.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import axios from 'axios'

let popup = [classes.signIn, classes.popupShow]
let showWrapper = [classes.modalWrapper, classes.showModalWrapper]

class Header extends React.Component {
  state = {
    currentEmail: 'kostyrin@ohanafitness.ru',
    email: 'enemy-iubip@mail.ru',
    password: '',
    popup: classes.signIn,
    wrapper: classes.modalWrapper,
  }
  signInHandler = async (event) => {
    event.preventDefault()
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  onChangeLogin = (event) => {
    this.setState({
      email: event.target.value,
    })
  }
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
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
                  onChange={this.onChangeLogin}
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
                  onChange={this.onChangePassword}
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
              disabled={this.state.isDisabledButtons}
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
          <span className={classes.userName}>{this.state.currentEmail}</span>
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

export default Header
