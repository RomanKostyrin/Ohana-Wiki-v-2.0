import React from 'react'
import classes from './Main.module.scss'
import Post from '../Post/Post'
import Editor from '../Editor/Editor'
import Users from '../Users/Users'

class Main extends React.Component {
  render() {
    if (this.props.activePost === 10) {
      return <Editor />
    } else if (this.props.activePost === 20) {
      return <Users />
    } else return <Post />
  }
}

export default Main
