import React from 'react'
import Post from '../Post/Post'
import Editor from '../Editor/Editor'
import Users from '../Users/Users'
import { Route, Switch } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/editor" component={Editor} />
        <Route path="/posts/:activePost" component={Post} />
        <Route path="/users" component={Users} />
        <Route path="/" exact component={MainPage} />
      </Switch>
    )
  }
}

export default Main
