import React from 'react'
import Main from './Components/Main/Main'
import classes from './App.module.scss'
import Navigation from './Components/Navigation/Navigation'
import axios from 'axios'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path="m" />
        </Switch>

        <Main />
      </>
    )
  }
}

export default App
