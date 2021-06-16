import Input from './Components/UI/Input/Input'
import classes from './App.module.scss'
import React from 'react'
import Button from './Components/UI/Button/Button'

class App extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <Input
          label={'Введите название'}
          labelType={'InputPassword'}
          type={'password'}
        />
        <Button type={'Button--important'}>Hello</Button>
      </div>
    )
  }
}

export default App
