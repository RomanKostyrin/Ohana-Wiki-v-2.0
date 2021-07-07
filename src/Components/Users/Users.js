import classes from './Users.module.scss'
import React from 'react'
import Loader from '../UI/Loader/Loader'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import axios from 'axios'

class Users extends React.Component {
  state = {
    users: ['admin', 'trener', 'mop'],
    isDisabledButtons: false,
    activeEmail: 0,
    newEmail: '',
    password: '',
    idTokens: ['', ''],
    newPassword: '',
  }

  onChangeLogin = (event) => {
    this.setState({
      newEmail: event.target.value,
    })
  }
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }
  changePasswordHandler = async (event) => {
    event.preventDefault()
    const authData = {
      idToken: this.state.setEmail,
      password: this.state.newPassword,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  registerHandler = async (event) => {
    event.preventDefault()
    const authData = {
      email: this.state.newEmail,
      password: this.state.password,
      returnSecureToken: true,
    }
    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ5AHawQ9Rr2m_pMRkOGSf_9pDqGcr8aU',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.container}>
        {this.state.isDisabledButtons ? <Loader /> : null}
        <section className={classes.mainSection}>
          <header className={classes.mainSectionHeader}>
            <h2 className={classes.mainSectionHeaderTitle}>Пользователи</h2>
          </header>
          <form className={classes.mainSectionFormUser}>
            <h2 className={classes.mainSectionHeaderTitle}>
              Создание нового пользователя
            </h2>
            <div className={classes.container}>
              <p className={classes.containerItem}>
                <Input
                  type={'text'}
                  inputTypeClass={'Input'}
                  labelTypeClass={'InputLabel'}
                  label={'Логин'}
                  name={'login'}
                  placeholder="Введите логин"
                  onChange={this.onChangeLogin}
                  value={this.state.newEmail}
                />
              </p>
              <p className={classes.containerItem}>
                <Input
                  type={'password'}
                  inputTypeClass={'Input'}
                  labelTypeClass={'InputLabel'}
                  label={'Пароль'}
                  name={'password'}
                  placeholder="Введите пароль"
                  onChange={this.onChangePassword}
                  value={this.state.password}
                />
              </p>
            </div>
            <Button
              type={'submit'}
              id={'NewUserBut'}
              classType2={'ButtonSubmit'}
              classType={'ButtonPrimary'}
              onClick={this.registerHandler}
              disabled={this.state.isDisabledButtons}
            >
              Создать
            </Button>
          </form>
          <form className={classes.mainSectionFormUser}>
            <h2 className={classes.MainSectionHeaderTitle}>
              Редактирование пользователя
            </h2>
            <div className={classes.container}>
              <p className={classes.containerItem}>
                <label className={classes.InputLabel}>
                  Логин:
                  <br />
                  <select
                    disabled={this.state.isDisabledButtons}
                    id={'selectUsers'}
                    name={'users'}
                    className={classes.signInSelect}
                    onChange={this.putActivePost}
                  >
                    {this.state.users.map((post, index) => {
                      return (
                        <option
                          value={index}
                          key={`optpost-${index}`}
                          id={`optpost-${index}`}
                        >
                          {post}
                        </option>
                      )
                    })}
                  </select>
                </label>
              </p>

              <p className={classes.containerItem}>
                <Input
                  type={'password'}
                  inputTypeClass={'Input'}
                  labelTypeClass={'InputLabel'}
                  label={'Пароль'}
                  name={'password'}
                  placeholder="Введите пароль"
                  onChange={this.onChangeLogin}
                  value={this.state.newEmail}
                />
              </p>
            </div>
            <Button
              type={'submit'}
              id={'RenameUserButton'}
              classType2={'ButtonSubmit'}
              classType={'ButtonPrimary'}
              onClick={this.onChangeForm}
              disabled={this.state.isDisabledButtons}
            >
              Сохранить
            </Button>
          </form>
        </section>
      </div>
    )
  }
}

export default Users
