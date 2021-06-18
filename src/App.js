import Input from './Components/UI/Input/Input'
import classes from './App.module.scss'
import React from 'react'
import Button from './Components/UI/Button/Button'

class App extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <Input
          label={'Логин'}
          labelTypeClass={'LabelSearch'}
          name={'Введите название'}
          type={'search'}
          inputTypeClass={'InputSearch'}
        />
        <Button type={'Button--important'}>Hello Ohana Fitness!!!</Button>
      </div>
    )
  }
}

export default App
