import React from 'react'
import Navigation from './Components/Navigation/Navigation'
import Post from './Components/Post/Post'
import Editor from './Components/Editor/Editor'
import Users from './Components/Users/Users'
import { Route, Switch } from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'

class App extends React.Component {
  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path="/editor" component={Editor} />
          <Route path="/posts/:activePost" component={Post} />
          <Route path="/users" component={Users} />
          <Route path="/" exact component={MainPage} />
        </Switch>
      </>
    )
  }
}

export default App
