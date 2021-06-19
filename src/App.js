import React from 'react'
import Main from './Components/Main/Main'
import classes from './App.module.scss'

class App extends React.Component {
  render() {
    return <Main className={classes.Main} />
  }
}

export default App
