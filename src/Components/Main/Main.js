import React from 'react'
import classes from './Main.module.scss'
import Post from '../Post/Post'
import { Route, Switch } from 'react-router-dom'
import Editor from '../Editor/Editor'

class Main extends React.Component {
  render() {
    {
      if (this.props.activePost === 10) {
        return (
          <Editor posts={this.props.posts} subPosts={this.props.subPosts} />
        )
      } else
        return (
          <Post
            className={classes.Post}
            posts={this.props.posts}
            activePost={this.props.activePost}
            activeSubPost={this.props.activeSubPost}
            subPosts={this.props.subPosts}
            onClick={this.props.onClick}
          />
        )
    }
  }
}

export default Main
