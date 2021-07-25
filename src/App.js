import React from 'react'
import Navigation from './Components/Navigation/Navigation'
import Post from './Components/Post/Post'
import { Route, Switch } from 'react-router-dom'
import Editor from './Components/Editor/Editor'
import Users from './Components/Users/Users'
import MainPage from './Components/MainPage/MainPage'
import Permissions from './Components/Permissions/Permissions'

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path="/editor" component={Editor} />
          <Route path="/posts/:activePost" component={Post} />
          <Route path="/users" component={Users} />
          <Route path="/perms" exact component={Permissions} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </>
    )
  }
}

export default App
