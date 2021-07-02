import React from 'react'
import classes from './Main.module.scss'
import Post from '../Post/Post'
import Editor from '../Editor/Editor'

class Main extends React.Component {
  render() {
    if (this.props.activePost === 10) {
      return <Editor />
    } else
      return (
        <Post
          subPosts={this.props.subPosts}
          className={classes.Post}
          posts={this.props.posts}
          activePost={this.props.activePost}
          activeSubPost={this.props.activeSubPost}
          subPost={this.props.subPost}
          onClick={this.props.onClick}
        />
      )
  }
}

export default Main
