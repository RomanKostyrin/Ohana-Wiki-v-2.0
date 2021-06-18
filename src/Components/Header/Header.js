import React from 'react'
import classes from './Header.module.scss'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'

class Header extends React.Component {
  logging = (event) => {
    event.preventDefault()
    console.log(event.target)
  }
  render() {
    return (
      <header className={classes.Header}>
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
          onClick={this.logging}
        >
          Войти
        </Button>

        <span className={classes.LoggedAs}>
          Вы вошли как: <span className={classes.userName}> Admin</span>
        </span>

        <Button
          classType={'ButtonPrimary'}
          classType2={'ButtonSignOut'}
          onClick={this.logging}
        >
          Выйти
        </Button>
      </header>
    )
  }
}

export default Header
